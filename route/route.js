const express = require('express');
const getData = require('../controller/getValidation');
const validateRule = require('../controller/validateRule')

const app = express();

app.get('', getData);
app.post('/validate-rule', validateRule);


module.exports = app;
