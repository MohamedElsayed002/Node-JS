
const CustomErr = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async (req,res,next) => {
    const token = req.headers.authorization;

    if(!token) {
        console.log('a7a')
    }
    

    try {
        
        const payload = isTokenValid({token})
        req.user = {name : payload.name , userId : payload.userId , role : payload.role}
        next()
    }catch(error) {
        console.log(error)
    }
}


// const authorizePermissions = (req,res,next) => {
//     if(req.user.role === "admin") {
//         console.log("go away motherfather ")
//     }
//     console.log("anta tmam w ana b7bk")
//     next()
// }

const authorizePermissions = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            console.log("a mashy ya abn ws5a mn hna :) ")
        }
        console.log("b7bk")
        next()
    }
}

module.exports = {
    authorizePermissions,
    authenticateUser
}