const express = require('express');
const router = express.Router();
const {decodeUser} = require('../../decodeuser')

const {createReply} = require ('../controllers/replies.controller')

// /* GET home page. */
router.post('/addReply/:commentId', decodeUser, createReply);

module.exports = router;
