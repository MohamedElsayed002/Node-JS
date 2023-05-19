

const jwt = require("jsonwebtoken")


const createJWT = ({payload}) =>{
    const token = jwt.sign(payload, 'Mohamed' , {
        expiresIn : '1d'
    })
    return token
}

const isTokenValid = ({ token }) => jwt.verify(token,'Mohamed');


module.exports = {
    createJWT,
    isTokenValid
}