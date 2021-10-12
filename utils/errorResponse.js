class errorResponse extends Error {
    constructor(message, statusCode) {
        super(message, statusCode );
        this.statusCode = statusCode || 404;
    }
}
module.exports = errorResponse;