const express = require('express');
const router = express.Router();
const {decodeUser} = require('../../decodeuser')

const {createReply} = require ('../controllers/replies.controller')

// /* GET home page. */
// router.get('/allproducts', ProductControllers.getProducts);
router.post('/addReply/:commentId', decodeUser, createReply);
// router.post('/addreply', decodeUser, CommentControllers.addReply);

// router.post('/login', AuthControllers.login);

module.exports = router;
