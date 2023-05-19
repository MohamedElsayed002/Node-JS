
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const path = require('path')


const createProduct = async (req,res) => {
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(201).json({product})
}

const getAllProducts = async (req,res) => {
    const products = await Product.find({})
    res.status(201).json({products})
}

const getSingleProduct = async (req,res) => {
    const {id} = req.params
    const product = await Product.findOne({_id : id})
    res.status(200).json({product})
}

const updateProduct = async (req,res) => {
    const {id : productId} = req.params

    const product = await Product.findOneAndUpdate({_id : productId} , req.body , {
        new : true,
        runValidators : true
    })

    if(!product) { 
        console.log("product not found")
    }

    res.status(201).json({message : "product updated successfully" , product})
}

const deleteProduct = async (req,res) => {
    const {id : productId} = req.params
    const product = await Product.findOne({_id : productId})
    if(!product) {
        console.log("product not found")
    }

    await product.delete()

    res.status(201).json({message : "product deleted successfully"})
}

const uploadImages = async (req,res) => {
    if(!req.files) {
        console.log("no file uploaded")
    }

    const productImage = req.files.image
    if(!productImage.mimetype.startsWith('image')) {
        console.log("only photos ya dudeee")
    }

    const maxSize = 1024 * 1024
    if(productImage.size > maxSize) {
        console.log("max size exceeded")
    }

    const imagePath = path.join(__dirname , '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(201).json({image : `/uploads/${productImage.name}`})


}


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImages
}