/**
 * Created by Administrator on 2017/1/7 0007.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('a', { name: '漆俊霞' });
});

module.exports = router;
