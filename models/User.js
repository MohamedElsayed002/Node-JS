
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'please provide name'],
        minLength :  3,
        maxLength : 50,
    },
    email : {
        type : String,
        required : [true , 'please provide email'],
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : 'please provide valid email'
        }
    },
    password : {
        type : String,
        required : [true,'please provide password']
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    }
})

UserSchema.pre('save' , async function () {
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hashSync(this.password,salt)
})

UserSchema.methods.comparePassword = async function (passwordSend) {
    const isMatched = await bcrypt.compare(passwordSend , this.password)
    return isMatched
}

module.exports = mongoose.model('User', UserSchema)