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


//for start order
// Define a route to fetch all items
app.get('/items', (req, res) => {
    const sql = "SELECT name, price, calories, description, url FROM items";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});

// Get item categories: 
app.get('/categories', (req, res) => {
    const sql = "SELECT name url FROM items";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});
//Get all items in soup category:
app.get('/soups', (req, res) => {
    const sql = "SELECT name, price, calories, description, url FROM items where category=soup";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});

//Get all items in bakery category:
app.get('/bakery', (req, res) => {
    const sql = "SELECT name, price, calories, description, url FROM items where category=bakery";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});

//Get all items in salad & bowls category:
app.get('/salads', (req, res) => {
    const sql = "SELECT name, price, calories, description, url FROM items where category=salad";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});

//Get all items in cold drinks category:
app.get('/colddrinks', (req, res) => {
    const sql = "SELECT name, price, calories, description, url FROM items where category=cold_drink";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});

//Get all items in hot drinks category:
app.get('/hotdrinks', (req, res) => {
    const sql = "SELECT name, price, calories, description, url FROM items where category=hot_drink";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});

// Get Create Account:
app.get('/create_account', function (req, res) {
    res.render('create_account')
})
app.post('/create_account', async(req, res) => {
    const user = await UserActivation.create({
        email: req.body.username,
        password: req.body.password
    });

    return res.status(500).json(user);
    });

// Login
app.post('/account_info', (req, res) => {
    res.render("account_info")
});

//Authenticate Login Information
//Encrpyt using Password hashing algorithm
const bcrypt = require("bcryptjs")

app.use(express.urlencoded({extended: 'false'}))


// Retrieve Account Info
app.post('/auth/createaccount', (req, res) => {    
    const {email, password} = req.body

    db.query('SELECT email FROM customers WHERE email = ?', [email], async (error, res) => {
        if(error){
            console.log(error)
        }
        if( result.length > 0 ) {
            return res.render('/create_account', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm) {
            return res.render('create_account', {
                message: 'Passwords do not match!'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        db.query('INSERT INTO users SET?', {email: email, password: password}, (err, res) => {
            if(error) {
                console.log(error)
            } else {
                return res.render('create_account', {
                    message: 'User Registered!'
                })
            }
        })
    })
})


//This API receives the product ID and user ID 
//and adds the product to the cart table database.
app.post('/addToCart', (req, res) => {
    const { productId, userId } = req.body;
    const sql = "INSERT INTO cart (item_name, item_price, quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1";
});

app.post('/CartQuantity', (req, res) => {
    const { cartId, quantity } = req.body;
    if (quantity > 0) {
        const sql = "UPDATE cart SET quantity = ? WHERE cartID = ?";
        db.query(sql, [quantity, cartId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cart updated' });
        });
    } else {
        const sql = "DELETE FROM cart WHERE cartID = ?";
        db.query(sql, [cartId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Item removed from cart' });
        });
    }
});
//Port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

