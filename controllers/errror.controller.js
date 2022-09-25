exports.sendErrorPage = (req, res, next) => {
  res.status(404).send('<h1>Image not foud!</h1>')
};