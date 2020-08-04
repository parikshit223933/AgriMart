const nodeMailer = require('../config/nodemailer');

exports.checkoutMailer = (data) =>
{
    let HTMLString = nodeMailer.renderTemplate({ price: data.price }, '/product/checkout.ejs');

    nodeMailer.transporter.sendMail({
        from: process.env.AGRIMART_SMTP_EMAIL,
        to: data.email,
        subject: 'Checkout from Agrimart!',
        html: HTMLString,
    }, (error, info)=>
    {
        console.log(error);
        return;
    });

    console.log('Checkout Message Sent!');
    return;
}