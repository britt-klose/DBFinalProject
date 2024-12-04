// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const bodyParser = require('body-parser');  // body-parser
const mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security

//const {authMiddleware} = require('.auth.js');
port=8081;
// // Create an instance of express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));  // Parsing Form Data
app.use(bodyParser.json());  // Parsing JSON data
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS for the frontend React app

// // Create a connection to the MySQL database
const db = mysql.createConnection({
host: "34.69.58.203", // Database host
user: "root",      // Database username
password: "123456", // Database password
database: "cafe" // Name of the database
});

// connect to the database
db.connect(function(err) {
    if (err)
        throw err;
    console.log("Connected to MySQL");
});

// // Define a route for the root URL '/'
app.get('/', (req, res) => {
    // Respond with a JSON message
    return res.json("From backend side");
    });

    // Define a route to fetch locations based on town or city name
    app.get('/search', (req, res) => {
        const cityTerm = req.query.city || ''; // Get the city search term from query parameters
        const sql = `SELECT location_address, town_city, state, zipcode, image_url FROM locations WHERE town_city LIKE ?`; // SQL query to search locations by city
        db.query(sql, [`%${cityTerm}%`], (err, results) => { // Use a parameterized query to prevent SQL injection
            if (err) {
                console.error('Failed to execute query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.json(results); // Return the query results as JSON
        });
    });
    
    app.post('/register', (req, res) => {
        const { fname, lname, location, event_name } = req.body;
        const sql = `INSERT INTO event_registration (fname, lname, location, event_name) VALUES (?, ?, ?, ?)`;
    
        db.query(sql, [fname, lname, location, event_name], (err, results) => {
            if (err) {
                console.error('Failed to insert data:', err);
                res.status(500).send('Error saving registration');
                return;
            }
            res.send('Registration successful. Thank you for registering!');
        });
    });

//Create Account
//Encrpyt using Password hashing algorithm
//const bcrypt = require("bcryptjs")

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.post('/create_account', async(req, res) => {   

const email = req.body.name;
const Hashedpassword = await bcrypt.hash(req.body.password,10);

db.getConnection(async(err, connection) => {

        if (err) throw (err)
        
        const sqlSearch= "SELECT email, password from customers where email = ?"
        const search_query = mysql.format(sqlSearch,[email])

        const sqlInsert = "INSERT INTO customers VALUES (0,?,?)"
        const insert_query = mysql.format(sqlInsert,[email, Hashedpassword])

        await connection.query (search_query, async(err, result)=> {

            if(err) throw(err)
            console.log("-----> Search Results")
            console.log(result.length)

            if (result.length != 0) {
                connection.release()
                console.log("-----> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query (insert_query, (err, results)=> {
                
                connection.release()

            if(err) throw(err)
            console.log ("------> Created new User")
            console.log(result.insertId)
            res.sendStatus(201)    
            })
        }
        })
        })
        })

// Login 
app.post('/account_info', (req, res)=> {
    
const email = req.body.name
const password = req.body.password

db.getConnection (async(err,connection)=> {

    if(err) throw(err)
    const sqlSearch = "Select email, password from customers where email = ?"
    const search_query = sql.fomrat(sqlSearch, [email])

    await conenction.query (search_query, async (err, result) => {

        connection.release()

        if(err) throw(err)
    
        if(result.length ==0) {
            console.log("------> User does not exist")
        }
        else {
            const hashedPassword = result[0].password

            if(await bycrypt.compare(password, hashedPassword)) {
            console.log("-------> Login Successful")
            res.send('${email} is logged in!')
            }
            else {
            console.log("----------> Password Incorrect")
            res.send("Password incorrect!")
            } 
        }
    })
    })
})

//This API receives the product ID and user ID 
//and adds the product to the cart table database.
// API to decrease the quantity of a product in the cart

app.post('/decreaseQuantity', (req, res) => {
    const { productId } = req.body;
    const sql = `UPDATE cart SET quantity = quantity - 1 WHERE cart_id = ? AND quantity > 1`;
    db.query(sql, [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Quantity decreased successfully', result });
    });
});

// API to increase the quantity of a product in the cart
app.post('/increaseQuantity', (req, res) => {
    const { productId } = req.body;
    const sql = `UPDATE cart SET quantity = quantity + 1 WHERE cart_id = ?`;
    db.query(sql, [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Quantity increased successfully', result });
    });
});

//Port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

