module.exports = (err, req, res, next) => {
  console.log("global error handler working", err);
  res.status(err.statusCode || 500).json({ error: `${err.message}` });
};
