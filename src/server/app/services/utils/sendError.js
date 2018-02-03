module.exports = (res, code, err) =
>
{
    return res.status(code).json({success: false, message: err.message || err}).end();
}
;