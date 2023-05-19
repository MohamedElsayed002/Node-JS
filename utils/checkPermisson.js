

const checkPermission = (requestUser,resourceUserId) => {
    // console.log(requestUser)
    // console.log(resourceUserId)
    // console.log(typeof resourceUserId)

    if(requestUser.role === 'admin') return
    if(requestUser.userId === resourceUserId.toString()) return
    console.log('a7a')
}

module.exports = checkPermission