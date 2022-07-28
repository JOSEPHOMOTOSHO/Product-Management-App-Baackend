const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'fileuploads/'})
const {decodeUser} = require('../../decodeuser')
const {createProduct,getProducts,getSingleProduct} = require ('../controllers/products.controller')

// /* GET home page. */
router.get('/getproducts', decodeUser, getProducts);
router.get('/:productId', decodeUser, getSingleProduct);

router.post('/addproduct',upload.single('image'), decodeUser, createProduct);

// router.get('/car/images/:key', (req,res)=>{
//     const key = req.params.key
//     const readStream = getFileStream(key)

//     readStream.pipe(res)
//   })

// router.post('/login', AuthControllers.login);

module.exports = router;
