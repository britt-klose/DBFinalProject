// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const app = express();
const port= 8081

//*** server waits indefinitely for incoming requests
app.listen(port, function () {
    console.log("NodeJS app listening on port " + port);
  });


const bodyParser = require('body-parser');  // body-parser
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security

//port=8081;
// // Create an instance of express
//const app = express();
//app.use(bodyParser.urlencoded({ extended: true }));  // Parsing Form Data
app.use(bodyParser.json());  // Parsing JSON data
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS for the frontend React app

// // Create a connection to the MySQL database
var db = mysql.createConnection({
host: "34.69.58.203", // Database host
user: "root",      // Database username
password: "123456", // Database password
database: "cafe" // Name of the database
});


//*** connect to the database
db.connect(function(err) {
    if (err)
        throw err;
    console.log("Connected to MySQL");
  });

  const fs = require("fs");

  function readAndServe(path, res)
  {
      fs.readFile(path,function(err, data) {
  
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    })
}



  app.get("/menu", function (req, res) {
    readAndServe("/DBFinalProject/htmlFile/index2.html",res)

});

app.post("/menu", function (req, res) {
    //var desc = req.body.desc;   // extract the strings received from the browser
    var sql_query = "select name, price, description, from itmes";

    con.query(sql_query, function (err, result, fields) { // execute the SQL string
		if (err)
		throw err;   

        else {

            //*** start creating the html body for the browser
            var html_body = "<HTML><STYLE>body{font-family:arial}</STYLE>";
            html_body = html_body + "<BODY><TABLE BORDER=1>";

            //*** print column headings
            html_body = html_body + "<TR>";
        for (var i = 0; i < fields.length; i++)
            html_body = html_body + ("<TH>" + fields[i].name.toUpperCase() + "</TH>");
            html_body = html_body + "</TR>";

            //*** prints rows of table data
            for (var i = 0; i < result.length; i++)
                html_body = html_body + ("<TR><TD>" + result[i].name + "</TD>" + "<TD>" + result[i].description + "</TD></TR>" + result[i].price + "</TD></TR>");

            html_body = html_body + "</TABLE>";



          console.log(html_body);             // send query results to the console
          res.send(html_body);                // send query results back to the browser
    }
});
});
