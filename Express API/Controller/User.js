const User= require('../Model/User');  



exports.login = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    User.find({email: email, password: password})
    .then(result =>{ 
        if(result.length >=1){
        res.status(200).json({ message: "User Logged Sucessfully",  isAuthenticated:true , User: result})
        }
        else{
            res.status(200).json({ message: "User Not LoggedIn Sucessfully",   isAuthenticated:false, User: result}) 
        }
    }).catch(err => {
        res.status(500).json({ message: err })
    })

}

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const SignInUser = new User({ email: email, password: password, firstname: firstname, lastname: lastname });
    SignInUser.save().then(result => {
        res.status(200).json({ message: "User Signed Sucessfully", User: result })
    }).catch(err => {
        res.status(500).json({ message: err })
    })
}