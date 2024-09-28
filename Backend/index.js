let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
let PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

let db;

// Initialize sqlite database connection
(async () => {
  db = await open({
    filename: './Backend/tracks_database.sqlite',
    driver: sqlite3.Database,
  });
  console.log("Database connected.");
})();

// function to fetch all tracks
async function fetchAllTracks(){
  let query = "SELECT * FROM tracks";
  let response = await db.all(query, []);
  return { tracks: response };
}

// Route to fetch all tracks
app.get("/tracks", async (req, res)=>{
 let results = await fetchAllTracks();

 res.status(200).json(results);
});

// function to fetch tracks by artist
async function fetchTracksByArtist(artist){
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  return { tracks: response };
}

// Route to fetch tracks by artist
app.get("/tracks/artist/:artist", async (req, res)=>{
 let artist = req.params.artist;
 let results = await fetchTracksByArtist(artist);

 res.status(200).json(results);
});

// function to fetch tracks by genre
async function fetchTracksByGenre(genre){
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { tracks: response };
}

// Route to fetch tracks by genre
app.get("/tracks/genre/:genre", async (req, res)=>{
 let genre = req.params.genre;
 let results = await fetchTracksByGenre(genre);

 res.status(200).json(results);
});

// function to fetch tracks by release year
async function fetchTracksByReleaseYear(year){
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { tracks: response };
}

// Route to fetch tracks by release year
app.get("/tracks/release_year/:year", async (req, res)=>{
 let year = req.params.year;
 let results = await fetchTracksByReleaseYear(year);

 res.status(200).json(results);
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
