module.exports.home=async (req, res)=>
{
    try
    {
        var options =
        {
            title: "AgriMart"
        };
        return res.render('home', options);
    }
    catch(error)
    {
        if(error)
        {
            console.log('There was some error in opening the home page!');
        }
    }
}