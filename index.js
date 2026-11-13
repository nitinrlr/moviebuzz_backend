const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
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

const movies = [
    {
        "_id": 1,
        "title": "Dune: Part Two",
        "year": 2024,
        "genre": "Sci-Fi",
        "rating": 8.0,
        "img_name": "images/dune.jpg",
        "runtime": "2h 46m",
        "tags": ["Sci-Fi", "Adventure", "Drama"],
        "description": "Paul Atreides joins Chani and the Fremen in the deserts of Arrakis to take revenge on the people who destroyed his family. As his power grows, visions of a terrible future force him to choose between the woman he loves and the fate of the universe.",
        "trailer": "https://www.youtube.com/embed/Way9Dexny3w",
        "director": "Denis Villeneuve",
        "writer": "Denis Villeneuve, Jon Spaihts",
        "studio": "Legendary Pictures",
        "budget": "190 Million",
        "cast": [
            { "name": "Timothée Chalamet", "role": "Paul Atreides" },
            { "name": "Zendaya", "role": "Chani" },
            { "name": "Rebecca Ferguson", "role": "Lady Jessica" },
            { "name": "Austin Butler", "role": "Feyd-Rautha" }
        ],
        "reviews": [
            { "user": "SpiceRunner", "rating": 8.5, "text": "Huge, loud, and beautiful. The sandworm ride alone is worth the ticket." },
            { "user": "DesertFox22", "rating": 8.0, "text": "A slow start, but the last hour is one of the best sci-fi finales in years." }
        ]
    },
    {
        "_id": 2,
        "title": "Spider-Man",
        "year": 2021,
        "genre": "Action",
        "rating": 9.1,
        "img_name": "images/s-man.jpg",
        "runtime": "2h 28m",
        "tags": ["Action", "Adventure", "Sci-Fi"],
        "description": "After the world learns Spider-Man's secret identity, Peter Parker asks Doctor Strange for help. When the spell goes wrong, dangerous villains from other universes start showing up, and Peter has to learn what it really means to be a hero.",
        "trailer": "https://www.youtube.com/embed/JfVOs4VSpmA",
        "director": "Jon Watts",
        "writer": "Chris McKenna, Erik Sommers",
        "studio": "Marvel Studios",
        "budget": "200 Million",
        "cast": [
            { "name": "Tom Holland", "role": "Peter Parker" },
            { "name": "Zendaya", "role": "MJ" },
            { "name": "Benedict Cumberbatch", "role": "Doctor Strange" },
            { "name": "Jacob Batalon", "role": "Ned Leeds" }
        ],
        "reviews": [
            { "user": "WebHead99", "rating": 9.5, "text": "The theater went crazy. A love letter to every Spider-Man fan." },
            { "user": "QueensKid", "rating": 9.0, "text": "Funny, emotional, and packed with surprises. The ending hit hard." }
        ]
    },
    {
        "_id": 3,
        "title": "Joker",
        "year": 2019,
        "genre": "Drama",
        "rating": 8.9,
        "img_name": "images/joker.jpg",
        "runtime": "2h 2m",
        "tags": ["Drama", "Crime", "Thriller"],
        "description": "Arthur Fleck is a struggling comedian in Gotham City who is ignored and mistreated by everyone around him. As his life falls apart, he slowly turns into the criminal known as the Joker.",
        "trailer": "https://www.youtube.com/embed/zAGVQLHvwOY",
        "director": "Todd Phillips",
        "writer": "Todd Phillips, Scott Silver",
        "studio": "Warner Bros. Pictures",
        "budget": "55 Million",
        "cast": [
            { "name": "Joaquin Phoenix", "role": "Arthur Fleck" },
            { "name": "Robert De Niro", "role": "Murray Franklin" },
            { "name": "Zazie Beetz", "role": "Sophie Dumond" },
            { "name": "Frances Conroy", "role": "Penny Fleck" }
        ],
        "reviews": [
            { "user": "GothamNights", "rating": 9.0, "text": "Joaquin Phoenix is unbelievable. Dark and uncomfortable in the best way." },
            { "user": "StairDancer", "rating": 8.5, "text": "The music and the stairs scene stuck with me for days." }
        ]
    },
    {
        "_id": 4,
        "title": "The Avengers",
        "year": 2012,
        "genre": "Action",
        "rating": 9.2,
        "img_name": "images/avngers.jpg",
        "runtime": "2h 23m",
        "tags": ["Action", "Adventure", "Sci-Fi"],
        "description": "When Loki steals the Tesseract and brings an alien army to Earth, Nick Fury brings together Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye. They have to stop fighting each other long enough to save New York.",
        "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
        "director": "Joss Whedon",
        "writer": "Joss Whedon",
        "studio": "Marvel Studios",
        "budget": "220 Million",
        "cast": [
            { "name": "Robert Downey Jr.", "role": "Iron Man" },
            { "name": "Chris Evans", "role": "Captain America" },
            { "name": "Scarlett Johansson", "role": "Black Widow" },
            { "name": "Chris Hemsworth", "role": "Thor" }
        ],
        "reviews": [
            { "user": "ShieldAgent", "rating": 9.5, "text": "Seeing the whole team in one shot for the first time was unreal." },
            { "user": "HulkSmash", "rating": 9.0, "text": "Great action and even better jokes. Still the most fun Marvel movie." }
        ]
    },
    {
        "_id": 5,
        "title": "The Lost World",
        "year": 1997,
        "genre": "Sci-Fi",
        "rating": 6.6,
        "img_name": "images/lostworld.jpg",
        "runtime": "2h 9m",
        "tags": ["Sci-Fi", "Adventure", "Action"],
        "description": "Four years after Jurassic Park, Ian Malcolm learns there is a second island where the dinosaurs have been living in the wild. He races there to save his girlfriend, just as a team of hunters arrives to capture the animals.",
        "trailer": "https://www.youtube.com/embed/PVp1sNNcFU0",
        "director": "Steven Spielberg",
        "writer": "David Koepp",
        "studio": "Universal Pictures",
        "budget": "73 Million",
        "cast": [
            { "name": "Jeff Goldblum", "role": "Dr. Ian Malcolm" },
            { "name": "Julianne Moore", "role": "Dr. Sarah Harding" },
            { "name": "Pete Postlethwaite", "role": "Roland Tembo" },
            { "name": "Vince Vaughn", "role": "Nick Van Owen" }
        ],
        "reviews": [
            { "user": "IslaSorna", "rating": 7.0, "text": "Not as good as the first, but the trailer cliff scene is so tense." },
            { "user": "RexInSanDiego", "rating": 6.5, "text": "The T. rex in the city is silly, but I still had fun." }
        ]
    },
    {
        "_id": 6,
        "title": "Jurassic Park",
        "year": 1993,
        "genre": "Sci-Fi",
        "rating": 9.0,
        "img_name": "images/jpark.jpg",
        "runtime": "2h 7m",
        "tags": ["Sci-Fi", "Adventure", "Thriller"],
        "description": "An island of prehistoric dinosaurs becomes a fight for survival when the park attractions escape their enclosures. John Hammond creates a theme park filled with cloned dinosaurs, but when the power shuts down, a group of scientists and his grandchildren must escape the island.",
        "trailer": "https://www.youtube.com/embed/QWBKEmWWL38",
        "director": "Steven Spielberg",
        "writer": "Michael Crichton",
        "studio": "Universal Pictures",
        "budget": "63 Million",
        "cast": [
            { "name": "Sam Neill", "role": "Dr. Alan Grant" },
            { "name": "Laura Dern", "role": "Dr. Ellie Sattler" },
            { "name": "Jeff Goldblum", "role": "Dr. Ian Malcolm" },
            { "name": "Richard Attenborough", "role": "John Hammond" }
        ],
        "reviews": [
            { "user": "RaptorJeff", "rating": 9.5, "text": "An absolute masterpiece. The effects still hold up better than most movies made today." },
            { "user": "Discover93", "rating": 8.5, "text": "A classic blockbuster that defined a generation. The score gives me goosebumps every time." }
        ]
    },
    {
        "_id": 7,
        "title": "Jaws 2",
        "year": 1978,
        "genre": "Horror",
        "rating": 5.8,
        "img_name": "images/jaws2.jpg",
        "runtime": "1h 56m",
        "tags": ["Horror", "Thriller"],
        "description": "A few years after the first attack, another great white shark shows up near Amity Island. Police Chief Brody is sure it is a shark, but no one believes him until a group of teenagers is trapped out on the water.",
        "trailer": "https://www.youtube.com/embed/DC73-_h7mwE",
        "director": "Jeannot Szwarc",
        "writer": "Carl Gottlieb, Howard Sackler",
        "studio": "Universal Pictures",
        "budget": "30 Million",
        "cast": [
            { "name": "Roy Scheider", "role": "Chief Martin Brody" },
            { "name": "Lorraine Gary", "role": "Ellen Brody" },
            { "name": "Murray Hamilton", "role": "Mayor Larry Vaughn" },
            { "name": "Jeffrey Kramer", "role": "Deputy Hendricks" }
        ],
        "reviews": [
            { "user": "AmityLocal", "rating": 6.0, "text": "Not the original, but Roy Scheider keeps it watchable." },
            { "user": "SharkWeekFan", "rating": 5.5, "text": "Too long, but the helicopter scene is a highlight." }
        ]
    },
    {
        "_id": 8,
        "title": "Jaws",
        "year": 1975,
        "genre": "Thriller",
        "rating": 8.3,
        "img_name": "images/jaws.jpg",
        "runtime": "2h 4m",
        "tags": ["Thriller", "Horror", "Adventure"],
        "description": "When a giant great white shark starts attacking swimmers at a small beach town, Police Chief Martin Brody teams up with a scientist and a tough fisherman to hunt it down before the summer is ruined.",
        "trailer": "https://www.youtube.com/embed/U1fu_sA7XhE",
        "director": "Steven Spielberg",
        "writer": "Peter Benchley, Carl Gottlieb",
        "studio": "Universal Pictures",
        "budget": "9 Million",
        "cast": [
            { "name": "Roy Scheider", "role": "Chief Martin Brody" },
            { "name": "Robert Shaw", "role": "Quint" },
            { "name": "Richard Dreyfuss", "role": "Matt Hooper" },
            { "name": "Lorraine Gary", "role": "Ellen Brody" }
        ],
        "reviews": [
            { "user": "BiggerBoat", "rating": 9.0, "text": "The movie that made everyone scared of the ocean. Still holds up." },
            { "user": "QuintsHat", "rating": 8.0, "text": "The USS Indianapolis speech is one of the best scenes ever filmed." }
        ]
    }
];

const upload = multer({ storage: storage });

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

// add a new movie from the form on the browse page
app.post("/api/movies", upload.single("img"), (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  if (!req.file) {
    res.status(400).send("Please upload a poster image");
    return;
  }

  const movie = {
    _id: movies.length + 1,
    title: req.body.title,
    year: parseInt(req.body.year),
    genre: req.body.genre,
    rating: parseFloat(req.body.rating),
    img_name: "images/" + req.file.filename,
    description: req.body.description,
  };

  movies.push(movie);
  res.status(200).send(movie);
});

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    genre: Joi.string()
      .valid("Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Thriller", "Romance", "Animation")
      .required(),
    rating: Joi.number().min(0).max(10).required(),
    description: Joi.string().max(500).allow(""),
  });

  return schema.validate(movie);
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
