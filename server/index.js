const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require("body-parser");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cruddata",

});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
    
app.get("/api/get", (req, res)=>{
    const sqlSelect = "SELECT * FROM new_table";
db.query(sqlSelect, (err, result) =>{
    res.send(result); 
});    
});

app.post("/api/insert", (req, res) =>{
    const movieName = req.body.movieName;
    const review = req.body.review;

    const sqlInsert = 
    "INSERT INTO new_table(movieName, review) VALUES (?,?)";
    db.query(sqlInsert, [movieName, review], (err, result) =>{
        console.log(result); 
    });
});

app.delete("/api/delete/:movieName", (req, res) =>{
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM new_table where movieName = ?";

    db.query(sqlDelete, name, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

app.put("/api/update", (req, res) =>{
    const name = req.body.movieName;
    const review = req.body.review;
    const sqlUpdate = "UPDATE new_table SET review = ? where movieName = ?";

    db.query(sqlUpdate,[review, name], (err, result) => {
        if(err){
            console.log(err);
        }
    });
});
app.listen(3001, () => {
    console.log("server is running on port 3001");
});