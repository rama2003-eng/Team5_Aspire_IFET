/*
 * Title : Project Collaboration Tool
 * Author : Rosary Abilash M
 * Created At : 02-04-2024
 * Last Modified Date : 26-05-2024
 * Reviewed By :
 * Review Date :
 */


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
    res.sendFile(__dirname + '/index.html'); 
});

// Route for serving login/signup page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html'); 
});

// Route for serving the signup page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/login.html'); 
});


// Route for serving the create_project page
app.get('/create_project', (req, res) => {
  res.sendFile(__dirname + '/create_project.html'); 
});



// Route for rendering the view project page
app.get('/viewProject', (req, res) => {
    // Fetch projects from the database 
    const query = 'SELECT * FROM projects ORDER BY priority DESC, endDate ASC';
    connection.query(query, (err, projects) => {
        if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render the view project page 
        res.render('view_project', { projects });
    });
});






app.post('/signup', (req, res) => {
    const { username, email, password, user_type } = req.body;

    // Query to check if user already exists with the provided email
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.length > 0) {
            // User with the provided email already exists
            res.send(`
                <script>
                    alert('Email is already registered');
                    window.location.href = '/signup';
                </script>
            `);
        } else {
            // Insert the new user into the database
            const insertUserQuery = 'INSERT INTO users (username, email, password, user_type) VALUES (?, ?, ?, ?)';
            connection.query(insertUserQuery, [username, email, password, user_type], (err, results) => {
                if (err) {
                    console.error('Error executing MySQL query:', err);
                    res.status(500).send('Internal server error');
                    return;
                }
                res.send(`
                    <script>
                        alert('Registered Successfully!..');
                        window.location.href = '/login';
                    </script>
                `);
            });
        }
    });
});


// // Route for handling signup form submissions
// app.post('/signup', (req, res) => {
//     const { username, email, password, user_type } = req.body;

//     // Insert the new user into the database
//     const query = 'INSERT INTO users (username, email, password, user_type) VALUES (?, ?, ?, ?)';
//     connection.query(query, [username, email, password, user_type], (err, results) => {
//         if (err) {
//             console.error('Error executing MySQL query:', err);
//             res.status(500).send('Internal server error');
//             return;
//         }
//         res.send(`
//                 <script>
//                     alert('Registered Successfully!..');
//                     window.location.href = '/login';
//                 </script>
//             `);
//     });
// });

// // Route for handling login form submission
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
  
//     // Query to check if user exists with provided email and password
//     const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//     connection.query(sql, [email, password], (err, results) => {
//       if (err) throw err;
  
//       // If a user is found, redirect to dashboard page and pass user details
//       if (results.length > 0) {
//         res.redirect(`/dashboard?userId=${results[0].id}`);
//       } else {
//         // If no user found, display error message
//         res.send('Invalid email or password');
//       }
//     });
//   });



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query to check if user exists with provided email
    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    connection.query(sqlCheckEmail, [email], (err, emailResults) => {
        if (err) throw err;

        if (emailResults.length === 0) {
            res.send(`
                <script>
                    alert('User not exist');
                    window.location.href = '/login';
                </script>
            `);
        } else {
            // If email exists, check if the provided password matches
            const sqlCheckPassword = 'SELECT * FROM users WHERE email = ? AND password = ?';
            connection.query(sqlCheckPassword, [email, password], (err, passwordResults) => {
                if (err) throw err;

                if (passwordResults.length === 0) {
                    res.send(`
                        <script>
                            alert('Invalid password');
                            window.location.href = '/login';
                        </script>
                    `);
                } else {
                    // If a user is found, redirect to dashboard page and pass user details
                    res.redirect(`/dashboard?userId=${passwordResults[0].id}`);
                }
            });
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
  
  


// Route for handling project form submission
// app.post('/createProject', (req, res) => {
//   const { projectName, description, startDate, endDate, projectManager, priority, teamMembers, tasks, milestones, goals, documents } = req.body;

//   // Insert the project information into the database
//   const projectQuery = 'INSERT INTO projects (projectName, description, startDate, endDate, projectManager, priority) VALUES (?, ?, ?, ?, ?, ?)';
//   connection.query(projectQuery, [projectName, description, startDate, endDate, projectManager, priority], (err, projectResult) => {
//       if (err) {
//           console.error('Error executing MySQL query for project:', err);
//           res.status(500).send('Internal server error');
//           return;
//       }

//       // Get the ID of the newly inserted project
//       const projectId = projectResult.insertId;

//       // Insert team members into the database
//       const teamMembersQuery = 'INSERT INTO team_members (projectId, memberName, role) VALUES ?';
//       const teamMembersData = teamMembers.map(member => [projectId, member.name, member.role]);
//       connection.query(teamMembersQuery, [teamMembersData], (err, teamMembersResult) => {
//           if (err) {
//               console.error('Error executing MySQL query for team members:', err);
//               res.status(500).send('Internal server error');
//               return;
//           }

//           // Insert tasks into the database
//           const tasksQuery = 'INSERT INTO tasks (projectId, taskDescription) VALUES ?';
//           const tasksData = tasks.map(task => [projectId, task]);
//           connection.query(tasksQuery, [tasksData], (err, tasksResult) => {
//               if (err) {
//                   console.error('Error executing MySQL query for tasks:', err);
//                   res.status(500).send('Internal server error');
//                   return;
//               }

//               // Handle other inserts for milestones, goals, documents, etc. if needed

//               // Redirect to a success page or send a success message
//               res.send('Project created successfully');
//           });
//       });
//   });
// });
// Route for handling project form submission
// Route for handling project form submission
app.post('/createProject', (req, res) => {
    const { projectName, description, startDate, endDate, projectManager, priority, teamMember, role, tasks, milestones, goals, documents } = req.body;

    // Insert the project information into the database
    const projectQuery = 'INSERT INTO projects (projectName, description, startDate, endDate, projectManager, priority) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(projectQuery, [projectName, description, startDate, endDate, projectManager, priority], (err, projectResult) => {
        if (err) {
            console.error('Error executing MySQL query for project:', err);
            res.status(500).send('Internal server error');
            return;
        }

        // Get the ID of the newly inserted project
        const projectId = projectResult.insertId;

        // Insert team members into the database
        const teamMembersQuery = 'INSERT INTO team_members (projectId, memberName, role) VALUES ?';
        const teamMembersData = teamMember.map((member, index) => [projectId, member, role[index]]);
        connection.query(teamMembersQuery, [teamMembersData], (err, teamMembersResult) => {
            if (err) {
                console.error('Error executing MySQL query for team members:', err);
                res.status(500).send('Internal server error');
                return;
            }

            // Insert tasks into the database
            const tasksQuery = 'INSERT INTO tasks (projectId, taskDescription) VALUES ?';
            const tasksData = tasks.map(task => [projectId, task]);
            connection.query(tasksQuery, [tasksData], (err, tasksResult) => {
                if (err) {
                    console.error('Error executing MySQL query for tasks:', err);
                    res.status(500).send('Internal server error');
                    return;
                }

                // Insert milestones into the database
                const milestonesQuery = 'INSERT INTO milestones (projectId, milestoneDescription) VALUES ?';
                const milestonesData = milestones.map(milestone => [projectId, milestone]);
                connection.query(milestonesQuery, [milestonesData], (err, milestonesResult) => {
                    if (err) {
                        console.error('Error executing MySQL query for milestones:', err);
                        res.status(500).send('Internal server error');
                        return;
                    }

                    // Insert goals into the database
                    const goalsQuery = 'INSERT INTO goals (projectId, goalDescription) VALUES ?';
                    const goalsData = goals.map(goal => [projectId, goal]);
                    connection.query(goalsQuery, [goalsData], (err, goalsResult) => {
                        if (err) {
                            console.error('Error executing MySQL query for goals:', err);
                            res.status(500).send('Internal server error');
                            return;
                        }

                        // Handle document uploads (not implemented in this code snippet)

                        // Redirect to a success page or send a success message
                        res.send('<script>alert("Project created successfully"); window.location.href="/view_project";</script>');

                    });
                });
            });
        });
    });
});






// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






