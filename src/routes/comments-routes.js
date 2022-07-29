const express = require('express');
const router = express.Router();
const {decodeUser} = require('../../decodeuser')

const {createComment} = require ('../controllers/comments.controller')

// /* GET home page. */
router.post('/addComment/:productId', decodeUser, createComment);


module.exports = router;
