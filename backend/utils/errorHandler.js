class ErrorHandler extends Error {               // While dealing with class we denote variable name with capital letter starting
    constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode

    Error.captureStackTrace(this,this.constructor);
}
}

module.exports  = ErrorHandler;