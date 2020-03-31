exports.sucsess = function (req, res, message, status){

    let StatusCode = status || 200;
    let StatusMessaage = message || '';

    res.status(StatusCode).send({
        error:false,
        status:StatusCode,
        body: StatusMessaage
    });
}

exports.error = function (req, res, message, status){
    
    let StatusCode = status || 500;
    let StatusMessaage = message || 'internal error';

    res.status(StatusCode).send({
        error:true,
        status:StatusCode,
        body: StatusMessaage
    });
}