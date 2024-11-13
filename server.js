const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file
    }
});
const upload = multer({ storage: storage });

// In-memory user storage (for demonstration purposes)
let users = [];

// Routes
app.post('/register', upload.single('document'), (req, res) => {
    const userData = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password, // Note: In production, never store passwords in plain text
        userType: req.body.userType,
        documentPath: req.file.path
    };
    users.push(userData); // Save user data to the in-memory array
    res.status(201).send('User  registered successfully');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid email or password');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});