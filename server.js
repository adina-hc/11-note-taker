// 1. Require 
const express = require("express");
const path = require("path");
let db = require("./db/db.json");
const fs = require("fs");

// 2. Definition of app and PORT
const app = express();
// Creating port for Heroku or localhost
let PORT = process.env.PORT || 3001;

// 3. Middleware needed for url, json and static express methods
app.use(express.urlencoded({ extended: true })); // recognizes incoming request Object as strings or arrays
app.use(express.json()); // recognizes incoming request Object as a JSON Object
app.use(express.static('public')); 

// 4. Send HTML notes to client
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// 5. Get json db response
app.get("/api/notes", (req, res) => {
    res.json(db);
})

// 6. Add user notes to HTML body
app.post("/api/notes", (req, res) => {
    let data = req.body;
    // Include an id to identify the user note, to be able to delete later
    data["id"] = Math.floor(Math.random()* Date.now());
    db.push(data);
    fs.writeFile("./db/db.json", JSON.stringify(db), err => {
        if(err) throw err
        res.json("dogs")
    })
})

// 7. Delete note
app.delete("/api/notes/:id", (req, res) => {
    let IdToDelete = req.params.id;
    for(i=0;i<db.length;i++){
        if(IdToDelete == db[i].id){
            db.splice(i, 1);
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(db), err => {
        if(err) throw err
        res.json("cats")
    })
})

// 8. Listen Server
app.listen(PORT, function(){
    console.log(`working on port ${PORT}`)
})