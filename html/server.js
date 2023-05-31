require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db.js');
const mongoose = require("mongoose");
const app = express();

// connect database
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

 //app.use('/api/users', require('./routes/api/users'));
 //app.use('/api/auth', require('./routes/api/auth'));
 //app.use('/api/profile', require('./routes/api/profile'));
 //app.use('/api/posts', require('./routes/api/posts'));
 app.use('/api/user1', require('./routes/api/user1'));


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`server started on port ${PORT}`));