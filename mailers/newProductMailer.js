const nodeMailer=require('../config/nodemailer');

exports.newProductMailer=(data)=>
{
    let HTMLString=nodeMailer.renderTemplate({
        name:data.product.name,
        price:data.product.price,
        description:data.product.description,
        category:data.product.category,
        minimumOrderQuantity:data.product.minimumOrderQuantity,
        createdOn:data.product.createdOn,
        coverImage:data.product.coverImage
    }, '/product/createProduct.ejs');

    nodeMailer.transporter.sendMail({
        from:process.env.AGRIMART_SMTP_EMAIL,
        to:data.userEmail,
        subject:'Congratulations your product is now live on agrimart!',
        html:HTMLString
    }, (error, info)=>
    {
        console.log(error);
        return;
    });
    console.log('Message for creation of a new product is sent!');
    return;
}