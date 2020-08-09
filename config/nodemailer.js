const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path=require('path');
const env=require('./environment');

let transporter = nodemailer.createTransport(env.smtp);

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