const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

app.get("/api/movies", (req, res) => {
  res.send([movies]);
});

// listen for incoming requests
app.listen(3000, () => {
  console.log("Server is running");
});

[
    {
        "_id": 1,
        "title": "Dune: Part Two",
        "year": 2024,
        "genre": "Sci-Fi",
        "rating": 8.0,
        "img_name": "images/dune.jpg"
    },
    {
        "_id": 2,
        "title": "Spider-Man",
        "year": 2021,
        "genre": "Action",
        "rating": 9.1,
        "img_name": "images/s-man.jpg"
    },
    {
        "_id": 3,
        "title": "Joker",
        "year": 2019,
        "genre": "Drama",
        "rating": 8.9,
        "img_name": "images/joker.jpg"
    },
    {
        "_id": 4,
        "title": "The Avengers",
        "year": 2012,
        "genre": "Action",
        "rating": 9.2,
        "img_name": "images/avngers.jpg"
    },
    {
        "_id": 5,
        "title": "The Lost World",
        "year": 1997,
        "genre": "Sci-Fi",
        "rating": 6.6,
        "img_name": "images/lostworld.jpg"
    },
    {
        "_id": 6,
        "title": "Jurassic Park",
        "year": 1993,
        "genre": "Sci-Fi",
        "rating": 9.0,
        "img_name": "images/jpark.jpg"
    },
    {
        "_id": 7,
        "title": "Jaws 2",
        "year": 1978,
        "genre": "Horror",
        "rating": 5.8,
        "img_name": "images/jaws2.jpg"
    },
    {
        "_id": 8,
        "title": "Jaws",
        "year": 1975,
        "genre": "Thriller",
        "rating": 8.3,
        "img_name": "images/jaws.jpg"
    }
]
