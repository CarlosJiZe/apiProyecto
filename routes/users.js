const router = require('express').Router()
const {singUp,logIn,getUsers,getUser,updateUser,deleteUser} =require('../controllers/users')

const auth = require('../config/auth')

router.post('/signUp',singUp);
router.post('/logIn',logIn)
router.get('/',auth.isAdmin,getUsers)
router.get('/:id',auth.isAdmin,getUser)
router.patch('/:id',auth.ismyprofile,updateUser)
router.delete('/:id',auth.ismyprofile,deleteUser)

module.exports = router