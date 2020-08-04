const nodeMailer=require('../config/nodemailer');

module.exports.sendMessageMailer = (data) =>
{
    let HTMLString = nodeMailer.renderTemplate(data, '/selfMailer/sendMessageToAgrimart.ejs');
    /* RECIEVING USER'S MESSAGE! */
    nodeMailer.transporter.sendMail({
        from: process.env.AGRIMART_SMTP_EMAIL,
        to: process.env.AGRIMART_SMTP_EMAIL,
        subject: data.subject,
        html: HTMLString,
    },
    (error, info)=>
    {
        if(error)
        {
            console.log(error);
            return;
        }
    });

    let HTMLString2=nodeMailer.renderTemplate(data, '/selfMailer/sendMessageToClient.ejs');
    /* SENDING A MAIL TO THE CLIENT THAT HE/SHE WILL BE CONTACTED SOON! */
    nodeMailer.transporter.sendMail({
        from: process.env.AGRIMART_SMTP_EMAIL,
        to: data.email,
        subject: 'Thank you for contacting Agrimart!',
        html: HTMLString2,
    },
    (error, info)=>
    {
        if(error)
        {
            console.log(error);
            return;
        }
    })
    console.log('contact message sent to both agrimart and client!');
    return;
}