const express = require('express');
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require('./config/db');

dotenv.config();
//rest object
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/v1/task',require('./routes/taskRoutes'));

app.get('/test', (req, res) => {
    res.status(200).send("<h1>Task Manager Crud</h1>")
})

//port
const PORT = process.env.PORT || 8000;

mySqlPool.query('SELECT 1').then(() => {
    console.log('MYSQL DB CONNECTED'.bgCyan.white)

    app.listen(PORT, () => {
        console.log(`Server Running on port ${process.env.PORT}`.bgMagenta.white);
    })

}).catch((error)=>{
    console.log(error);
});
