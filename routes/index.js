var express = require('express');
var router = express.Router();

const CTRL_INDEX = require('../controllers/index');

/* GET home page. */
router.get('/', CTRL_INDEX.fetch);

module.exports = router;
