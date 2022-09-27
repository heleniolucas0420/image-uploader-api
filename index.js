const express = require('express');
const bodyParser = require('body-parser');

const image_routes = require('./routes/image.routes');
const error_routes = require('./routes/error.routes');

const app = express();
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const allowed_origins = ['http://localhost:3000', 'https://charming-kheer-078bf1.netlify.app'];
  const origin = req.headers.origin;

  if (allowed_origins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
})

app.get('/', (req, res, next) => {
  res.status(200).send('<h1>Server is up and runnig! 🌚</h1>');
});
app.use('/images', image_routes);
app.use(error_routes);

app.listen(port, () => console.log('server running on port ' + port));