const env=require('../../../config/environment');
const STRIPE_SECRET_KEY = env.stripe_secret_key;
const STRIPE_PUBLISH_KEY = env.stripe_publish_key;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const User = require("../../../models/userModel");
const Product = require("../../../models/productModel");
const queue=require('../../../config/kue');
const checkoutMailer=require('../../../mailers/checkoutMailer');
const checkoutMailerWorker=require('../../../workers/checkoutMailerWorker');
/* DO NOT REMOVE THE UNUSED IMPORTS */

module.exports.createPayment = async (req, res) => { //{Items for checkout}
    const items = req.body.state.items;
    const userEmail=req.body.userEmail;
    let user=await User.findOne({email:userEmail});
    if(!user)
    {
        return res.json(403, {
            success:false,
            message:'User is not allowed to perform this action!'
        });
    }
    // !WARNING: WE SHOULDNT BE DIRECTLY CONTINUING WITH THE PAYMENT.
    //FIRSTLY CHECK FOR THE ALL THESE ITEMS, DO THEY EXIST IN THE DB OR NOT, IF NOT THEN CANCEL THE TRANSACTION!
    
    //calculate amount
    let amount = 0;
    for(let i = 0; i < items.length; i++) {
        const quantity = items[i].quantity;
        const cost = items[i].price; 
        amount += quantity * cost;
    }
    if(amount === 0) {
        return res.json(400, {
            success: false,
            message: "amount can't be 0"
        })
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
            // Verify your integration in this guide by including this parameter
            metadata: {integration_check: 'accept_a_payment'},
        });

        let job=queue
        .create('checkout_mailer_worker', {price:amount, email:userEmail})
        .save(function(error)
        {
            if(error)
            {
                console.log(error);
                return;
            }
            console.log(`Job is enqueued with job id ${job.id}`)
        })

        return res.json(200, {
            success: true,
            clientSecret: paymentIntent.client_secret,
            amount
        })
    } catch (error) {
        console.log(error);
        return res.json(500, {
            success: false,
            message: "Internal Server Error!"
        });
    }
}

/* module.exports.createPaymentForProduct = async (req, res) => { //{productId}
    try {
        //find user to calculate total amount of cart
        const product = await Product.findById(req.body.productId);
        //calculate amount
        let amount = product.price;
        try {
            //keeping track of any failed payment attempts 
            //and ensuring the customer is only charged once
            //Return the client secret to finish the payment on the client.
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'inr',
                // Verify your integration in this guide by including this parameter
                metadata: {integration_check: 'accept_a_payment'},
            });
            return res.json(200, {
                success: true,
                clientSecret: paymentIntent.client_secret
            })
        } catch (error) {
            return res.json(500, {
                success: false,
                message: "Stripe Payment Error!"
            });
        }
    } catch (error) {
        return res.json(500, {
            success: false,
            message: "Internal Server Error!"
        });
    }
    
} */