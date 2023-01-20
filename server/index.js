const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

let locations = [];

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '88038513@Bryan',
    database: 'packageSystem'

});

app.post('/create',(req, res) => {
    const name = req.body.name
    const lat = req.body.lat
    const lng = req.body.lng

    db.query('INSERT INTO packages (name, lat, lng) VALUES (?,?,?)',
    [name, lat, lng])
})

app.get('/packages', (req, res) => {
    db.query("SELECT * FROM packages", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/location', (req, res) => {
    res.send(JSON.stringify(locations));
})

app.post('/location', (req, res) => {
    let coordinates = req.body;
    locations.push(coordinates);
    res.send(JSON.stringify('coordinates saved'));
    console.log(locations);
})

app.listen(3001, ()=> {
    console.log("Server running on port 3001")
});
