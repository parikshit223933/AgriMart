const nodeMailer=require('../config/nodemailer');

exports.authMailer=(userEmail)=>
{
    console.log('Sending mail to the user!');

    nodeMailer.transporter.sendMail({
        from:process.env.AGRIMART_SMTP_EMAIL,
        to:userEmail,
        subject:'New LogIn',
        html:'<h5>You are logged in to your account successfully!<h5>'
    }, (error, info)=>
    {
        console.log(error);
        return;
    });

    console.log('Message Sent!');
    return;
}