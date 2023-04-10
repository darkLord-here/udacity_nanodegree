// Setup empty JS object to act as endpoint for all routes
let projectData = {
    test: 'test'
};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
function listening(){
    console.log(`Server is running at port ${port}`);
}

app.listen(port, listening);


app.get('/all', retrieveData)

function retrieveData(req, res){
    res.send(projectData);
}

app.post('/addWeather', postData)

function postData(req, res){
    projectData = req.body;
    res.send(projectData);
}