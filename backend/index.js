const port = 4000;
const express = require('express');
const path = require("path");
const cors = require('cors');
//const Business = require("./model/Business");
//const mongoose = require("mongoose");
//const MongoClient = require('mongodb').MongoClient;
const { createConnection } = require('mysql');
//const { createConnection } = require('mongoose');



const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(cors());


const pool = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "business",
    connectionLimit: 10
})
pool.connect((err) => {
    if (err) {
        console.log("error de connexion : " + err.stack);
        return
    }
    else console.log('Connexion réussie à la BD')
})

app.get("/api",(req,res)=>{
    res.send("Express App is Running")
})


app.get("/api/all", (req, res) => {
    pool.query("SELECT COUNT(CASE WHEN type = 'Italian' THEN 1 END) AS italianCount, \
                COUNT(CASE WHEN type = 'Mexican' THEN 1 END) AS mexicanCount, \
                COUNT(CASE WHEN type = 'Indian' THEN 1 END) AS indianCount \
                FROM business", (err, countResult) => {
        if (err) return res.status(500).json({ message: 'Error retrieving counts', error: err });

        pool.query("SELECT * FROM business", (err, businessResult) => {
            if (err) return res.status(500).json({ message: 'Error retrieving businesses', error: err });

            return res.json({ 
                businesses: businessResult, 
                counts: {
                    italianCount: countResult[0].italianCount,
                    mexicanCount: countResult[0].mexicanCount,
                    indianCount: countResult[0].indianCount
                }
            });
        });
    });
});



app.post('/api/add', (req, res) => {
    sql = 'INSERT INTO business (name,phone,type,latitude,longitude,distance,availability) VALUES (?,?,?,?,?,?,?)';
    const values = [
        req.body.name,
        req.body.phone,
        req.body.type,
        req.body.latitude,
        req.body.longitude,
        req.body.distance,
        req.body.availability
    ]
    pool.query(sql, values, (err, result) => {
        if (err) return res.json({ message: 'something unexpected has occured', err })
        return res.json({ success: "Student added successfully" })
    })


});

app.post('/api/availability', (req, res) => {
    const { latitude, longitude } = req.body;
    
    const sql = 'UPDATE business SET availability = 0 WHERE latitude = ? AND longitude = ?';
    
    pool.query(sql, [latitude, longitude], (err, result) => {
        if (err) {
            console.error("Error updating availability:", err);
            return res.status(500).send("Error updating availability");
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).send("Business not found");
            }
            console.log("Availability updated successfully");
            return res.status(200).send("Availability updated successfully");
        }
    });
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port)
    } else {
        console.log("Error : " + error)
    }
})