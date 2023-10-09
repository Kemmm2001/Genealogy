const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors')
const initWebFamilyTree = require("./Router/FamilyGenealogy")


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middleware để parse JSON từ request body
app.use(express.json());

app.listen(port);
app.use(cors())
initWebFamilyTree(app);

console.log('Server started at http://localhost:' + port);