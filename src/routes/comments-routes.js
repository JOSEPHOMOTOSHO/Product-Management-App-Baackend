const express = require('express');
const router = express.Router();
const {decodeUser} = require('../../decodeuser')

const {createComment} = require ('../controllers/comments.controller')

// /* GET home page. */
// router.get('/allproducts', ProductControllers.getProducts);
router.post('/addComment/:productId', decodeUser, createComment);
// router.post('/addreply', decodeUser, CommentControllers.addReply);

// router.post('/login', AuthControllers.login);

module.exports = router;
