const AuthRouter = require('express').Router();
const User = require('../schema/UserSchema')
const {createJwtToken, validateToken} = require('../utils/jwt_utils')
const {isEmpty} = require('../utils/utils')

AuthRouter.route('/validate')
.post((req, res)=>{
    console.log("POST at /auth/validate")

    if(req.body && !isEmpty(req.body)){
        if(req.body.token){
            if(validateToken(req.body.token)){
                res.status(200).json({
                    status:0,
                    message:'token valid'
                })
            }
            else{
                res.status(403).json({
                    status:2,
                    message:'token invalid'
                })
            }
        }
    }
    else{
        res.status(403).json({
            status:2,
            error: 'no valid token'
        });
    }
})

AuthRouter.route('/login')
.post((req, res)=>{
    console.log("POST at /auth/login")

    if(req.body && !isEmpty(req.body)){
        if(req.body.email && req.body.password){

            User.findOne({email : req.body.email})
            .then(user=>{
                // console.log(user)
                if(req.body.password === user.password){
                    res.status(200).json({
                        status : 0,
                        token : createJwtToken(user)
                    })
                }else{
                    res.status(200).json({
                        status : 1,
                        error : "incorrect password"
                    })
                }
            })
            .catch(err => {
                res.status(200).json({
                    status:1,
                    error : "user not found"
                })
            })
        }else{
            res.status(400).json({
                status:2,
                error: 'include email & password'
            });       
        }
    }
    else{
        res.status(400).json({
            status:2,
            error: 'include request body'
        });
    }
})

AuthRouter.route('/signup')
.post((req, res)=>{
    console.log('POST at /auth/signup');
    
    if(req.body && !isEmpty(req.body)){
        // console.log(req.body)

        let newUser = new User({
            firstName: req.body.firstName || "",
            lastName: req.body.lastName || "",
            mobile: req.body.mobile || "",
            email: req.body.email || "",
            city: req.body.city || "",
            password: req.body.password || "",
        })

        newUser.save()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                status:2,
                error : "failed to create user"})
        })

    }
    else{
        res.status(400).json({
            status:2,
            error: 'include request body'
        });
    }

})

module.exports = AuthRouter;