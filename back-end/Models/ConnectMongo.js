  // // ConnectMongo.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nhatanh:dyHYbATHsEVlwFg4@cluster0.wdrnvdj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => console.log(err.message));
