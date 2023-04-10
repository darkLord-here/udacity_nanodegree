const express = require('express');
const app = express();
const port = 8000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


const cors = require('cors');
app.use(cors());

app.listen(port, listening);


function listening(){
    console.log(`server running at port ${port}`);
}