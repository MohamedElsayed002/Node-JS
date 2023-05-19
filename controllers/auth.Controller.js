const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const {createJWT , createTokenUser} = require('../utils')


const register = async (req,res) => {
    const {email,name,password}  = req.body
    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists')
    }

    // first registered user is an admin

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({name,password,email,role})

    const tokenUser = createTokenUser(user)
    const token = createJWT({payload :  tokenUser })
    res.status(StatusCodes.CREATED).json({user,token})
}



const login = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password) {
        throw new CustomError.BadRequestError('please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentdials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('a7a')
    }
    const tokenUser = createTokenUser(user)
    const token = createJWT({payload :  tokenUser })
    res.status(200).json({message : "logged in successfully" , user , token})
}


const logout = async (req,res) => {
    res.send('user logged out')
}


module.exports = {
    register,
    login,
    logout
}