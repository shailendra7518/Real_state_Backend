const createCustomError = (message, statusCode) => {
  console.log(message,statusCode)
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
 console.log("check here")
return  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = { createCustomError, errorHandler };
