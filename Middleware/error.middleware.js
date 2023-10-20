const errorMiddleware = (err, req, res, next) => {
    console.log("baderror")
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
};

module.exports = errorMiddleware;