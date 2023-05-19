const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {createJWT , createTokenUser , checkPermission} = require('../utils')



const getAllUsers = async (req,res) => {
    console.log(req.user)
    const users = await User.find({role : 'user'}).select('-password')
    res.status(StatusCodes.OK).json({message : "success", users})

}

const getSingleUser = async (req,res) => {

    const user = await User.findOne({_id : req.params.id}).select('-password')
    checkPermission(req.user,user._id)
    res.status(StatusCodes.OK).json({message : "success" , user})


}

const showCurrentUser = async (req,res) => {
    res.status(StatusCodes.OK).json({user : req.user})
}

const updateUser = async (req,res) => {
    const {email , name} = req.body
    if(!email || !name) {
        throw new Error("all fields are required")

    }
    const user = await User.findOneAndUpdate(
            {_id : req.user.userId},
            {email,name},
            {new : true , runValidators : true}
    )

    const tokenUser = createTokenUser(user)
    const token = createJWT({payload :  tokenUser })

    res.status(201).json({message : "updated", user , token})

}

const updatedUserPassword = async (req,res) => {
    const {oldPassword , newPassword} = req.body
    if(!oldPassword || !newPassword) {
        throw new Error("all fields are required")
    }
    const user = await User.findOne({_id : req.user.userId})
    console.log(user)
    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if(!isPasswordCorrect) {
        throw new Error("wrong password")
    }

    user.password = newPassword
    await user.save()
    res.status(201).json({message : "password changed"})
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updatedUserPassword
}