const jwt = require('jsonwebtoken')

exports.createJwtToken = (user) => {
    let token = jwt.sign({
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        mobile:user.mobile
    },
    process.env.JWT_SECRET,
    {expiresIn: '7d'}
    )

    return token;
}

exports.validateToken = (token) => { //returns boolean
    var validityStatus;

    jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
        if(err){validityStatus=false}
        else{validityStatus=true}
    });

    return validityStatus;
}

exports.decodeToken = (token) => {
    return jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
}