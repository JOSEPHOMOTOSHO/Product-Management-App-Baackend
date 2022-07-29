const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'fileuploads/'})
const {decodeUser} = require('../../decodeuser')
const {createProduct,getProducts,getSingleProduct,getProductImage} = require ('../controllers/products.controller')

// /* GET home page. */
router.get('/getproducts', decodeUser, getProducts);
router.get('/:productId', decodeUser, getSingleProduct);
router.get('/images/:key', getProductImage)

router.post('/addproduct',upload.single('image'), decodeUser, createProduct);




module.exports = router;
