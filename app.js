require('dotenv').config();
const express = require("express");

const route = require('./route/route')

const app = express();
const port = process.env.PORT || 3000;

//Parse Content-Type
const { urlencoded, json } = express;
app.use([urlencoded({ extended: false }), json()]);
app.use('/', route);

app.use('*', (req, res) => res.status(404).json({
  message: 'This route does not exist',
  status: 'error',
  data: null,
}));

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

module.exports = app;
