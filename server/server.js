const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

// MongoDB connection url
const mongoURL = 'mongodb://admin:667788@project-shard-00-00-mf3dr.mongodb.net:27017,project-shard-00-01-mf3dr.mongodb.net:27017,project-shard-00-02-mf3dr.mongodb.net:27017/employment?ssl=true&replicaSet=Project-shard-0&authSource=admin&retryWrites=true';

const http = require('http');

// Connect to MongoDB
mongoose.connect( mongoURL,{ useNewUrlParser: true }, (err, db) => {
    if(err) console.log( 'mongodb Error: ' + err );
});

app.use(express.static(path.join(__dirname, '../client/build')));

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Create a server
const server = http.createServer(app);

// Import routes
const routes = require('./routes/index')();
app.use('/', routes);


//Upload Avatar Image
const multer = require('multer');
const cors = require('cors');
app.use(express.static(path.join(__dirname,'public')));
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({
    storage
})
app.use(cors());
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file)
        res.json({
            imageUrl: `images/uploads/${req.file.filename}`
        });
    else
        res.status("409").json("No Files to Upload.");
});



server.listen(port);