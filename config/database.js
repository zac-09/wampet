//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://wampetic:NhXoZufqxn3VdSt8@cluster0.8ki4koc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;