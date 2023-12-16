const express = require('express');
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

app.use((req, res, next) => {
    console.log(`Nhận request cho API: ${req.url}`);
    next(); // Chuyển tiếp yêu cầu đến middleware hoặc định tuyến tiếp theo
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())

initWebFamilyTree(app);
initWebInformation(app);
initWebEvent(app);
initWebConfig(app);
initWebAuthen(app);
console.log('Server started at http://localhost:' + port);
app.listen(port);
