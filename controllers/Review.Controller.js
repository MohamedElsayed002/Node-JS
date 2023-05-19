const Review = require('../models/Review')
const Product = require('../models/Product')
const {checkPermission} = require('../utils')


const createReview = async (req,res) => {
    const {product : productId} = req.body

    const isValidProduct = await Product.findOne({_id : productId})
    if(!isValidProduct) {
        console.log(`no product with id : ${productId}`)
        return;
    }

    const alreadySubmitted = await Review.findOne({
        product : productId,
        user : req.user.userId
    })

    if(alreadySubmitted) {
        console.log('you submitted review beforee')
    }


    req.body.user = req.user.userId
    const review = await Review.create(req.body)
    res.status(201).json({review})
}


const getAllReviews = async (req,res) => {
    const review = await Review.find({}).populate({path : 'product', select : 'name company price'}).populate({path : 'user',select : 'name role'})
    res.status(201).json({review , count : review.length})
}

const getSingleReview = async (req,res) => {
    const {id} = req.params
    const review = await Review.findOne({_id : id})
    if(!review) {
        console.log("review not found")
    }
    res.status(201).json({review})
}

const updateReview = async (req,res) => {
    const {id} = req.params
    const {rating,title,comment} = req.body

    const review = await Review.findOne({_id : id})
    if(!review) {
        console.log('not found')
    }

    checkPermission(req.user,review.user)

    review.rating = rating
    review.title = title
    review.comment = comment
    await review.save()

    res.status(201).json({message : "updateeeeed", review})
}


const deleteReview = async (req,res) => {
    const {id} = req.params
    const review = await Review.findOne({_id : id})
    if(!review) {
        console.log('not found')
    }
    checkPermission(req.user,review.user)
    await review.remove()
    res.status(201).json({message : 'review deleted successfullyy'})
}

const getSingleProductReviews = async (req,res) => {
    const {id} = req.params
    const reviews = await Review.find({product : id})
    res.status(201).json({reviews,count : reviews.length})
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    getSingleProductReviews
}