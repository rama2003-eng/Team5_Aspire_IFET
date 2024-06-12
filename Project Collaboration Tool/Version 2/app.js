// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create Express app
const app = express();


app.set('view engine', 'ejs');

// Set up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));




// Create a MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route for serving login/signup page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Replace with actual path to HTML file
});

// Route for serving login/signup page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html'); // Replace with actual path to HTML file
});

// Route for handling signup form submissions
app.post('/signup', (req, res) => {
    const { username, email, password, user_type } = req.body;

    // Insert the new user into the database
    const query = 'INSERT INTO users (username, email, password, user_type) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, email, password, user_type], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal server error');
            return;
        }

        // User signed up successfully
        res.sendFile(__dirname + '/login.html');
    });
});

// Route for handling login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Query to check if user exists with provided email and password
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
      if (err) throw err;
  
      // If a user is found, redirect to dashboard page and pass user details
      if (results.length > 0) {
        res.redirect(`/dashboard?userId=${results[0].id}`);
      } else {
        // If no user found, display error message
        res.send('Invalid email or password');
      }
    });
  });
  
// Route to render the dashboard
app.get('/dashboard', (req, res) => {
    const userId = req.query.userId;

    // Query to get user information from the database
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render the dashboard HTML file and inject user details
        res.render('dashboard', { user: rows[0] });
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
