const MomentRouter = require('express').Router();

const User = require('../schema/UserSchema')
const Moment = require('../schema/MomentSchema')
const {decodeToken} = require('../utils/jwt_utils')
const {isEmpty} = require('../utils/utils')

MomentRouter.route('/')
.get((req, res)=>{

    console.log("GET at /moments")

    if(req.headers['authorization']){
        let authHeader = String(req.headers['authorization'])
        if(authHeader.startsWith('Bearer ')){

            let token = authHeader.substring(7, authHeader.length);
            // console.log(token)
            let decoded_token = decodeToken(token)
            // console.log(user)
            
            User.findOne({email : decoded_token.email})
            .then(user => {
                Moment.find({userId :user._id})
                .then(moments => {
                    // console.log(moments)
                    res.status(200).json(moments)
                })
                .catch(err => {
                    // console.log(err)
                    res.status(500).json({
                        status:1,
                        error:"cannot retrive moments"
                    })
                })
            })

        }else{
            res.status(403).json({
                status:2,
                error : "user unauthenticated"
            })
        }
    }
    else{
        res.status(403).json({
            status:2,
            error : "user unauthenticated"
        })
    }
})

.post(async (req, res)=>{
    console.log("POST at /moments")

    if(req.body && !isEmpty(req.body)){
        
        if(req.body.token){
            let decoded_token = decodeToken(req.body.token)
            // console.log(user)
            
            await User.findOne({email : decoded_token.email})
            .then(async user => {
                // console.log("User", user)

                    let moment = await new Moment({
                        userId : user._id,
                        title: req.body.title || "",
                        tags: req.body.tags || [],
                        imageUrl: "",
                    })

                    // console.log(moment)
                    
                    await moment.save()
                    .then(moment => {
                        res.status(200).json(moment)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            status:1,
                            error:"moment cannot be created"
                        })
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status:2,
                    error: "user does not exist"
                })
            })
            
        }else{
            res.status(403).json({
                status:2,
                error : "user unauthenticated"
            })
        }
    }
})

MomentRouter.route('/:id')
.get((req, res)=>{
    console.log("GET at /moments/:id")

    if(req.body && !isEmpty(req.body)){

        if(req.body.token){
            let decoded_token = decodeToken(req.body.token)
            // console.log(user)
            
            User.findOne({email : decoded_token.email})
            .then(user => {
                Moment.findOne({_id : req.params.id})
                .then(moment => {
                    // console.log(moments)
                    res.status(200).json(moment)
                })
                .catch(err => {
                    // console.log(err)
                    res.status(500).json({
                        status:1,
                        error:"cannot retrive moment"
                    })
                })
            })

        }else{
            res.status(403).json({
                status:2,
                error : "user unauthenticated"
            })
        }
    }
})

.put(async (req, res)=>{
    console.log("PUT at /moments/:id")

    if(req.body && !isEmpty(req.body)){
        
        if(req.body.token){
            let decoded_token = decodeToken(req.body.token)
            // console.log(user)
            
            await User.findOne({email : decoded_token.email})
            .then(async user => {
                if(user){
                    await Moment.findOneAndUpdate({_id : req.params.id},
                        {
                            userId : user._id,
                            title: req.body.title || "",
                            tags: req.body.tags || [],
                            imageUrl: "",
                        }
                    )
                    .then(moment => {
                        res.status(200).json(moment)
                    })
                    .catch(err => {
                        res.status(500).json({
                            status:1,
                            error:"moment cannot be updated"
                        })
                    })
                }else{
                    res.status(400).json({
                        status:1,
                        error:"failed to create moment"
                    })
                }    
            })
            .catch(err => {
                res.status(400).json({
                    status:2,
                    error: "user does not exist"
                })
            })
            
        }else{
            res.status(403).json({
                status:2,
                error : "user unauthenticated"
            })
        }
    }
})

.delete((req, res)=>{
    console.log("DELETE at /moments/:id")

    if(req.body && !isEmpty(req.body)){

        if(req.body.token){
            let decoded_token = decodeToken(req.body.token)
            // console.log(user)
            
            User.findOne({email : decoded_token.email})
            .then(user => {
                Moment.findOneAndDelete({_id : req.params.id})
                .then(moment => {
                    // console.log(moments)
                    res.status(200).json(moment)
                })
                .catch(err => {
                    // console.log(err)
                    res.status(500).json({
                        status:1,
                        error:"cannot delete moment"
                    })
                })
            })

        }else{
            res.status(403).json({
                status:2,
                error : "user unauthenticated"
            })
        }
    }
})

module.exports = MomentRouter;