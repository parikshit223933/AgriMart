const STRIPE_SECRET_KEY = 'sk_test_51H9F89HyvUiMKHjeXM6hg3SfXh1cXrknjsEMavZ1XDcQPy63T5lk3EjEwDyPfMIehwadZvSj4CiffzVLBFA9bswU00dvPXvrkq';
const STRIPE_PUBLISH_KEY = 'pk_test_51H9F89HyvUiMKHjejfcy7c0VYxb3a7AvYvCwQ9H7zx00NJpIThu90qwueiPRXsH9j0bfe7sGHWKTe1JWDDAU0ked00l1v3ppVd'
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const User = require("../../../models/userModel");
const Product = require("../../../models/productModel");

module.exports.createPayment = async (req, res) => { //{Items for checkout}
    console.log(req.body);
    const items = req.body.items;
    console.log(items);
    //calculate amount
    let amount = 100000, cart;
    for(item in items) {
        const quantity = item.quantity;
        const cost = item.price; //**check var name**
        amount += quantity * cost;
    }
    if(amount === 0) {
        return res.json(400, {
            success: false,
            message: "amount can't be 0"
        })
    }
    console.log(amount);
    try {
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