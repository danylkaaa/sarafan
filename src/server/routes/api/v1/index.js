var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/company', require('./routes/company'));
router.use('/invite', require('./routes/invite'));
router.use('/user', require('./routes/user'));
router.use('/review', require('./routes/review'));
router.use('/position', require('./routes/position'));

module.exports = router;