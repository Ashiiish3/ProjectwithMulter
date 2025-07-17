const express = require('express');
const connectWithDB = require('./config/db');
const noteRouter = require('./routes/note.routes');
const app = express();
const path = require('path');
const cors = require('cors');


app.use(express.static('photos'));

// console.log(path.join(__dirname, 'photos'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.use("/notes", noteRouter)

app.listen(5000, async () => {
    try {
        await connectWithDB();
        console.log('Server is running on port 5000');
        
    } catch (error) {
        console.log('Error starting the server:', error);
    }
})