const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors')

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port); 
app.use(cors())
// initWeb(app);

console.log('Server started at http://localhost:' + port);