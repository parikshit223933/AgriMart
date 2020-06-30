const User = require('../models/userModel');

/* rendering the sign up page */
module.exports.sign_up = (req, res) =>
{
    return res.render('sign_up', {
        title: 'sign_up | Agrimart'
    });
}
/* rendering the sign in page */
module.exports.sign_in = (req, res) =>
{
    return res.render('sign_in', {
        title: 'sign_in | Agrimart'
    });
}

/* to create a new user as a result of sign up */
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

/* to create a session for an existing user as a result of signing in. */
module.exports.createSession = (req, res) =>
{
    User.findOne({ email: req.body.email }, (error, user) =>
    {
        if (error)
        {
            console.log('There was an error in finding the user in the database while creating the user!');
        }
        if (user)//if the user is found in the database
        {
            if (user.password != req.body.password)//user is found but the password did not match to that in the database.
            {
                return res.redirect('back');
            }
            //now if everything goes fine, i.e. the pass. as well as email matches to that in the database, then we have to create a session.
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
            //creating a session is analogous to creating a cookie corresponding to the user id in the user's browser. 
        }
        else//if the user is not found in the database
        {
            return res.redirect('back');
        }
    })
}

/* action to render user's profile. */
module.exports.user_profile = (req, res) =>
{
    if (req.cookies.user_id)//before rendering the profile page we need to check if the user_id is there in the browser's cookies
    {//if the user_id is there in the cookies, we need to find the user by that id in the database
        User.findById(req.cookies.user_id, (error, user) =>
        {
            if (error)
            {
                console.log('There was an error in finding the user before rendering the profile page.', error);
            }
            if (user)//if that user is present in the database, then render the userprofile page of that user
            {
                return res.render('user_profile', {
                    title: 'User Profile',
                    user:user
                });
            }
            else//if the user is not found in the database, then return back to the sign in page.
            {
                return res.redirect('/users/sign_in');
            }
        })
    }
    else//if the cookie was not found in the browser, the return to the page from where the user has come.
    {
        return res.redirect('back');
    }
}

module.exports.sign_out=(req, res)=>{
    if(req.cookies.user_id)
    {
        res.clearCookie('user_id');
    }
    return res.redirect('/users/sign_in');
}