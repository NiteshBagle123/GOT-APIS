const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const battle = require('./routes/battle.route');

const dev_db_url = 'mongodb://localhost:27017/battle';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();
const port = process.env.port || 3000;
require('./health')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/battles', battle);
app.listen(port , ()=> {
    console.log('Server is running on port number:'+ port);
});