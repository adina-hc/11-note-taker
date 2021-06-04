const express = require("express")
const path = require("path")
let db = require("./db/db.json");
const fs = require("fs")

const app = express()
let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.post("/api/notes", (req, res) => {
    let data = req.body;
    data["id"] = Math.floor(Math.random()*20000000000)
    db.push(data)
    fs.writeFile("./db/db.json", JSON.stringify(db), err => {
        if(err) throw err
        res.json("dogs")
    })
})

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

app.listen(PORT, function(){
    console.log(`working on port ${PORT}`)
})