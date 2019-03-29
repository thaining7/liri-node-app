require("dotenv").config();
var moment = require('moment');
moment().format();
var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var spotifyApi = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);