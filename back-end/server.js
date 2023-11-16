const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3003;
const path = require('path');
const cors = require('cors')
const initWebFamilyTree = require("./Router/FamilyGenealogy")
const initWebInformation = require("./Router/InformationGenealogy")
const initWebEvent = require("./Router/EventGenealogy")
const initWebConfig = require('./Router/Config')
const initWebAuthen = require('./Router/Auth')
const initWebOthers = require('./Router/Others')

const bodyParser = require('body-parser');
const imagePath = path.join(__dirname, 'uploads', 'images', 'member-photo');

// Cấu hình để phục vụ các tệp tĩnh từ đường dẫn /uploads
app.use('/uploads', express.static(imagePath));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.listen(port);
app.use(cors())

initWebFamilyTree(app);
initWebInformation(app);
initWebEvent(app);
initWebConfig(app);
initWebAuthen(app);
initWebOthers(app)
console.log('Server started at http://localhost:' + port);