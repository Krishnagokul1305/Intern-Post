module.exports = (err, req, res, next) => {
  console.log("global error handler working");
  res.status(err.statusCode || 500).send({ error: `${err.message}` });
};
