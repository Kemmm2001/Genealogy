  // // ConnectMongo.js
  // const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    dbName: 'Capstone',
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => {
    console.log('mongodb connected')
})
.catch((err) => console.log(err.message))