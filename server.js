// asking for  express to be active in my server
const express = require("express");
const cors = require("cors"); //requiring cors as we installed it before so it will , so that we will use it in our server
const app = express() // Start up an instance of app
app.use(cors()); // Enabling CORS Requests
const bodyParser = require("body-parser"); //requiring a middler ware body-parser 
app.use(bodyParser.urlencoded({ extended: false })); // parsing our application urlencoded
app.use(bodyParser.json());// parse application/json
projectData = {}; // endpoing for data data routes which is an empty JS object 
app.use(express.static("website")); // allowing app to trigger our main project folder
 
app.get("/all", function allgot(req, res){
  res.status(200).send(projectData);
} ); // creating get route with callback function to send project data
function datapost (req, res) {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);    // configuring a function for Post (/all) Route
  };
app.post("/add", datapost); // post Route
const port = 8080;
const hostname = "127.0.0.1";
const listenit = () =>    // listenting weather the server is working or not 
console.log(`Server running at http://${hostname}:${port}/`);
app.listen(port, listenit);