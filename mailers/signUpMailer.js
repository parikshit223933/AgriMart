const nodeMailer=require('../config/nodemailer');

exports.signUpMailer=(user)=>
{
    let HTMLString=nodeMailer.renderTemplate({name:user.name.toString()}, '/auth/signUp.ejs')

    nodeMailer.transporter.sendMail({
        from:process.env.AGRIMART_SMTP_EMAIL,
        to:user.email.toString(),
        subject:'Welcome to Agrimart!',
        html:HTMLString,
    }, function(error, info)
    {
        console.log(error);
        return;
    })
    console.log('Message Sent!');
    return;
}