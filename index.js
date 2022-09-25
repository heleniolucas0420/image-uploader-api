const express = require('express');
const bodyParser = require('body-parser');

const image_routes = require('./routes/image.routes');
const error_routes = require('./routes/error.routes');

const app = express();
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
})

app.use('/images', image_routes);
app.use(error_routes);

app.listen(port, () => console.log('server running on port ' + port));