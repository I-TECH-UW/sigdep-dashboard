const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const User = require('./models/User');
const withAuth = require('./middleware');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

app.use(express.static(CLIENT_BUILD_PATH));

const upload = multer({ dest: 'uploads/' });

const secret = 'mysecretsshhh';

// MySQL connection configuration
const dbConfig = {
  host: 'mysql',
  user: 'rootu',
  port: '3306',
  password: 'password',
  database: 'routes'
};

const db = mysql.createConnection(dbConfig);


 db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Check if the users table exists, create it if it doesn't
  const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )`;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created or already exists');

      // Check if there are any admin users, create one if none exist
      const checkAdminQuery = `SELECT COUNT(*) AS adminCount FROM users WHERE email = 'admin@gmail.com'`;
      db.query(checkAdminQuery, (err, results) => {
        if (err) {
          console.error('Error checking for admin user:', err);
        } else {
          const adminCount = results[0].adminCount;
          if (adminCount === 0) {
            const createAdminQuery = `INSERT INTO users (email, password) VALUES ('admin@gmail.com', 'adminpassword')`;
            db.query(createAdminQuery, (err) => {
              if (err) {
                console.error('Error creating admin user:', err);
              } else {
                console.log('Admin user created');
              }
            });
          }
        }
      });
    }
  });
}); 



// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.post('/api/authenticate', async function(req, res) {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ error: 'Internal error please try again' });
      }

      const user = results[0];
      
      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
      
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
      
      // Issue token
      const payload = { email };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error please try again' });
  }
});

app.post('/api/register', async function(req, res) {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ error: 'Internal error please try again' });
      }

      const user = results[0];
      
      if (user) {
        return res.status(401).json({ error: 'Email already exists' });
      }
      
      const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(query, [email, password], (error, results) => {
        if (error) {
          console.error('Error executing MySQL query:', error);
          return res.status(500).json({ error: 'Internal error please try again' });
        }
        
        // Issue token
        const payload = { email };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        
        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error please try again' });
  }
});

app.get('/api/logout', function(req, res) {
  res.clearCookie('token').sendStatus(200);
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const originalName = req.file.originalname;
  const filePath = req.file.path;
  const filename = 'locations.csv';

  const destinationPath = path.join(__dirname, 'uploads', filename);
  fs.rename(filePath, destinationPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save file' });
    }

    res.json({ message: 'File saved successfully' });
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/fetch-file', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'locations.csv');
  res.sendFile(filePath);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
