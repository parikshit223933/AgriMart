const nodeMailer=require('../config/nodemailer');

exports.authMailer=(user)=>
{
    let HTMLString=nodeMailer.renderTemplate({name:user.name.toString()}, '/auth/login.ejs');

    nodeMailer.transporter.sendMail({
        from:process.env.AGRIMART_SMTP_EMAIL,
        to:user.email.toString(),
        subject:'New LogIn',
        html:HTMLString,
    }, (error, info)=>
    {
        console.log(error);
        return;
    });

    console.log('Message Sent!');
    return;
}