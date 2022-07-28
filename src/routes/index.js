const express = require("express")
const  router = express.Router();
const  sampleController = require('../controllers/sample');

router.get('/', function(_req, res, _next) {
  const message = sampleController();

  res.status(200).json({ message });
});

module.exports = router;
