const express = require('express')
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImages
} = require('../controllers/product.controller')
const {authenticateUser , authorizePermissions} = require('../middleware/authentication')
const { getSingleProductReviews } = require('../controllers/Review.Controller')



const router = express.Router()

router
    .route('/')
    .post([authenticateUser,authorizePermissions('admin')] , createProduct)
    .get(getAllProducts)

router
    .route('/:id')
    .get(getSingleProduct)
    .patch([authenticateUser,authorizePermissions('admin')] , updateProduct)
    .delete([authenticateUser,authorizePermissions('admin')] , deleteProduct)

router
    .route('/uploadImage')
    .post([authenticateUser,authorizePermissions('admin')]  , uploadImages)


router
    .route('/:id/reviews').get(getSingleProductReviews)


module.exports = router