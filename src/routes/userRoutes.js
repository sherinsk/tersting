const express=require('express');
const {userController}=require('../controllers/userController')

const router=express.Router()



router.post('/register', userController.registration);
router.get('/showall',userController.showAll)



module.exports=router