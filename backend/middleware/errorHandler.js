//404 errors-route handling errors

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    error.status = 404
    next(error)
}

//500 errors-server errors

export const errorHandler = (err, req, res, next) => {

    console.error(err.stack) // Logs the full stack trace for debugging

    const errorCode = err.status || err.statusCode || 500

    res.status(errorCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? {
            message: err.message,
            stack: err.stack,
            statusCode: errorCode,
        } : undefined,
    })
}