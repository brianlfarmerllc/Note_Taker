var express = require("express");
var path = require("path");
var fs = require("fs")
// var db = require("./db/db.json")

var app = express();
// lets the port equal whatever heroku chooses for it. 
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// sets up a public folder access for express to access files in the folder
app.use(express.static("public"))

// creates path for notes and default path
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// creates a get on the dp.json file
app.get("api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", function (res){
  return res.json(res)
  })
});

app.post("/api/notes", function(req, res) {
    fs.appendFile("./db/db.json", JSON.stringify(req.body), function (err) {
        if (err) {
            console.log(err)
        }
    })
  });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});