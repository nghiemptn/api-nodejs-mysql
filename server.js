const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//middleware
app.use(bodyParser.json());

//config connect
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students', //name of sql in mysql
    multipleStatements: true
})

//connect to MySQL
mysqlConnection.connect(err => {
    if (!err) {
        console.log('Connected to DB');
    } else {
        console.log('Connect Failed');
    }
})

//get all students information
app.get('/students', (req, res) => {
    mysqlConnection.query('SELECT * FROM information', (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

//get students information by id
app.get('/students/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM information WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

//delete students information by id
app.delete('/students/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM information WHERE id = ?', [req.params.id], err => {
        if (!err) {
            res.send('Deleted successfully');
        } else {
            console.log(err);
        }
    })
})

//insert students information
app.post('/students', (req, res) => {
    let infor = req.body;
    mysqlConnection.query('INSERT INTO information(id, name, age, level) VALUES (?, ?, ?, ?)', [infor.id, infor.name, infor.age, infor.level], err => {
        if (!err) {
            res.send('Inserted successfully');
        } else {
            console.log(err);
        }
    })
})

//update students information
app.put('/students/:id', (req, res) => {
    let infor = req.body;
    mysqlConnection.query('UPDATE information SET id = ?, name = ?, age = ?, level = ? WHERE id = ?', [infor.id, infor.name, infor.age, infor.level, infor.id], err => {
        if (!err) {
            res.send('Updated successfully');
        } else {
            console.log(err);
        }
    })
})

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})