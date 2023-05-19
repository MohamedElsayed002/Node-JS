
const CustomErr = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async (req,res,next) => {
    const token = req.headers.authorization;

    if(!token) {
        throw new Error("invalid token")
    }
    

    try {
        
        const payload = isTokenValid({token})
        req.user = {name : payload.name , userId : payload.userId , role : payload.role}
        next()
    }catch(error) {
        throw new Error(error)
    }
}




const authorizePermissions = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            throw new Error("you are not authorized to access this route")
        }
        next()
    }
}

module.exports = {
    authorizePermissions,
    authenticateUser
}