const express = require('express');
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors')
const initWebFamilyTree = require("./Router/FamilyGenealogy")
const initWebInformation = require("./Router/InformationGenealogy")
const initWebEvent = require("./Router/EventGenealogy")
const initWebConfig = require('./Router/Config')
const initWebAuthen = require('./Router/Auth')

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middleware để parse JSON từ request body
app.use(express.json());

app.listen(port);
app.use(cors())
initWebFamilyTree(app);
initWebInformation(app);
initWebEvent(app);
initWebConfig(app);
initWebAuthen(app);

console.log('Server started at http://localhost:' + port);