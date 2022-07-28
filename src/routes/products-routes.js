const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'fileuploads/'})
// const {uploadFile, getFileStream} = require('../s3')
const {decodeUser} = require('../../decodeuser')
const {createProduct,getProduct} = require ('../controllers/products.controller')

// /* GET home page. */
// router.get('/allproducts', verifyToken, ProductControllers.getProducts);
router.get('/getproduct', decodeUser, getProduct);
router.post('/addproduct',upload.single('image'), decodeUser, createProduct);

// router.get('/car/images/:key', (req,res)=>{
//     const key = req.params.key
//     const readStream = getFileStream(key)

//     readStream.pipe(res)
//   })

// router.post('/login', AuthControllers.login);

module.exports = router;
