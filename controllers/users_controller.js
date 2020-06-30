
module.exports.sign_up=(req, res)=>
{
    console.log('hello');
    return res.render('sign_up', {
        title:'sign_up | Agrimart'
    });
}
module.exports.sign_in=(req, res)=>
{
    return res.render('sign_in', {
        title:'sign_in | Agrimart'
    });
}
