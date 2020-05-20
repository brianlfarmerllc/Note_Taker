const express = require("express");
const path = require("path");
const fs = require("fs")
const db = require("./db/db.json")
const uuid = require('uuid');

const app = express();
// lets the port equal whatever heroku chooses for it. 
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// sets up a public folder access for express to access files in the folder
app.use(express.static("public"))

// creates a get on the dp.json file
app.get("/api/notes", function (req, res) {
    return res.json(db);
});

app.post("/api/notes", function (req, res) {
    let dbList = db;
    let newNote = {
        id: uuid.v1(),
        title: req.body.title,
        text: req.body.text
    }
    dbList.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(dbList, null, 2), function (err) {
        if (err) {
            console.log(err)
        }
        res.json(newNote)
    })
})

app.delete("/api/notes/:id", function (req, res) {
    let deleteId = req.params.id;
    let dbList = db.filter(item => item.id !== deleteId)
    
    fs.writeFile("./db/db.json", JSON.stringify(dbList, null, 2), function (err) {
        if (err) {
            console.log(err)
        }
        res.json(newNote)
    })

})

// creates path for notes and default path
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});