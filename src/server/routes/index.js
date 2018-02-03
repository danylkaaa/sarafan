var express = require('express');
var router = express.Router();

// API processing
router.use('/api/v1/', require('@APIv1'));

// send root file
router.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

// catch 404 and forward to error handler
router.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
router.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || (err.status == 404 ? "Not found" : "Something going wrong"),
        code: err.status || 500
    });
});
console.log("+Routes: configured");


module.exports = router;
