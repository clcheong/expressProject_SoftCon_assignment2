const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Hello world"});
})
   


// Sample data
let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];

// 1. Functionality: Get all users
app.get('/users', (req, res) => {
    res.json(users);
});
    
// 2. Functionality: Get a specific user by ID
app.get('/users/:userId', (req, res) => {
    const id = parseInt(req.params.userId);
    const user = users.find(u => u.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// 3. Functionality: Add a new user
app.post('/users', (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        res.status(400).json({ error: 'Missing required fields' });
    } else {
        const newUser = { id, name };
        users.push(newUser);
        res.status(201).json(newUser);
    }
});

// 4. Functionality: Update a user
app.put('/users/:userId', (req, res) => {
    const id = parseInt(req.params.userId);
    const { name } = req.body;
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = name;
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// 5. Functionality: Delete a user
app.delete('/users/:userId', (req, res) => {
    const id = parseInt(req.params.userId);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(3000);