const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updatedUserPassword
} = require('../controllers/user.Controller')
const {authenticateUser , authorizePermissions} = require('../middleware/authentication')


const router = express.Router()

router.route('/').get(authenticateUser , authorizePermissions('admin','user') ,getAllUsers)
router.route('/showMe').get(authenticateUser,showCurrentUser)
router.route('/updateUser').post(authenticateUser,updateUser)
router.route('/updateUserPassword').patch(authenticateUser,updatedUserPassword)
router.route('/:id').get(authenticateUser,getSingleUser)


module.exports = router