const User = require('../models/userModel');

module.exports.sign_up = (req, res) =>
{
    if (req.isAuthenticated())/* sign up page wont be available when the user is already logged in */
    {
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: 'sign_up | Agrimart'
    });
}
module.exports.sign_in = (req, res) =>
{
    if (req.isAuthenticated())/* sign in page wont be available when the user is already logged in */
    {
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: 'sign_in | Agrimart'
    });
}

module.exports.user_profile = (req, res) =>
{
    return res.render('user_profile', {
        title: 'User Profile'
    });
}
module.exports.create = (req, res) =>
{
    if (req.body.password != req.body.confirm_password) //if the passwords entered in the "password" and confirm password" field are not same, then the user will be redirected back to the page he came from.
    {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, (error, user) =>
    {
        if (error)
        {
            console.log('There was an error in firnd the user from the database. (signing up)', error);
        }
        if (!user)//if the user does not exists in the database, then we'll need to create the user
        {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, (error, user) =>
            {
                if (error)
                {
                    console.log('Error in creating new user during sign up.', error);
                }
                return res.redirect('/users/sign_in');
            });
        }
        else//the user who is trying to sign up, is already present in the database (his email)
        {
            return res.redirect('back');
        }
    })

}
module.exports.create_session = (req, res) =>
{
    return res.redirect('/');
}

module.exports.destroy_session = (req, res) =>
{
    /* the log out function is given to request by passport.js */
    req.logout();//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    return res.redirect('/users/sign_in');
}