var express = require('express');
var router = express.Router();

const ci = require('../controllers/index');

/* GET home page. */
router.get('/', ci.fetch);

module.exports = router;
