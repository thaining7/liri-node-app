require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
moment().format();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var liriInput = process.argv[2];
var liriInput1 = process.argv[3];
var movieTitle = "";
var songTitle = "";
var artistName = "";
var defaultMovie = "Mr. Nobody";
var defaultSong = "Ace of Base The Sign";

function switchCase() {

    switch (liriInput) {

        case "concert-this":
            concertThis(liriInput1);
            break;

        case "spotify-this-song":
            spotifyThis(liriInput1);
            break;

        case "movie-this":
            movieThis(liriInput1);
            break;

        case "do-what-it-says":
            doThis();
            break;

        default:
            console.log('Please enter one of the following commands: concert-this "artist/band name", spotify-this-song "song name", movie-this "movie name", or "do-what-it-says" for a mystery demo');
            break;
    }
}


// Concert this yo //

function concertThis(liriInput1) {
    if (liriInput1 === undefined) {
        console.log("Please enter a band or artist name");
    }
    else {
        artistName = liriInput1;

        // console.log("Artist Name: " + artistName);
        axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(function (response) {
            console.log("Name of venue: " + response.data[0].venue.name, "Country of venue: " + response.data[0].venue.country, "City of venue: " + response.data[0].venue.city, "Date of concert: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        });
    }
}


// Spotify this yo //

function spotifyThis(liriInput1) {

    if (liriInput1 === undefined) {
        songTitle = defaultSong;
    }
    else {
        songTitle = liriInput1;
    }

    // console.log("song title:" + songTitle);
    spotify
        .search({ type: 'track', query: songTitle })
        .then(function (response) {
            console.log("Song Artist: " + response.tracks.items[0].artists[0].name, "Song Name: " + response.tracks.items[0].name, "Song Preview Link: " + response.tracks.items[0].preview_url, "Song Album: " + response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });
}


// Movie this yo //

function movieThis(liriInput1) {

    if (liriInput1 === undefined) {
        movieTitle = defaultMovie;
    } else {
        movieTitle = liriInput1;
    }

    // console.log("Movie Title: " + movieTitle);
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(response.data);
            console.log("Title: " + response.data.Title, "Year: " + response.data.Year, "IMDB Rating " + response.data.Ratings[0].Value, "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value, "Country: " + response.data.Country, "Language: " + response.data.Language, "Plot: " + response.data.Plot, "Actors: " + response.data.Actors);
        });
}


// do-what-it-says //

function doThis() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Sorry, there's a problem, check the file path");
        }
        // console.log(data);
        var dataArr = data.split(",");

        liriInput2 = dataArr[0];
        
        liriInput3 = dataArr[1].trim().slice(1, -1).trim();

        if (liriInput2 === "spotify-this-song") {
            spotifyThis(liriInput3);
        }

        else if (liriInput2 === "concert-this") {
            concertThis(liriInput3);
        }

        else if (liriInput2 === "movie-this") {
            movieThis(liriInput3);
        }
    });
}

switchCase();