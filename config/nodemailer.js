const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path=require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.AGRIMART_SMTP_EMAIL,
        pass: process.env.AGRIMART_SMTP_PASSWORD
    }
});

let renderTemplate = (data, relativePath) =>
{
    let mailHTML;
    ejs.renderFile(path.join(__dirname, '../views/mailers', relativePath), data, function (error, template)
    {
        mailHTML=template;
    });
    return mailHTML;
}
module.exports={
    transporter,
    renderTemplate
}