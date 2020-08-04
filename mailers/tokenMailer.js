const nodeMailer = require('../config/nodemailer');

exports.tokenMailer = (data) =>
{
    let HTMLString = nodeMailer.renderTemplate(data, '/auth/forgotPassword.ejs');

    nodeMailer.transporter.sendMail({
        from: process.env.AGRIMART_SMTP_EMAIL,
        to: data.email,
        subject: 'Reset Password -Agrimart',
        html: HTMLString,
    }, function (error, info)
    {
        if (error)
        {
            console.log(error);
            return;
        }
        console.log('Message to change the password sent Successfully!');
        return;
    })
}