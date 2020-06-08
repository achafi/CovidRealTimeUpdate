// Import the modules we need
const rp = require('request-promise');
const cheerio = require('cheerio');

// Define the URLS we will be scraping
const baseURL = 'https://www.worldometers.info/coronavirus/';
arr = [];
// Define the method for collecting the data
const getCountriesData = async () => {
	const html = await rp(baseURL);
	const tableHead = cheerio('#maincounter-wrap', html)
		.map(function() {
			arr.push(cheerio(this).html());
			//console.log(cheerio(this).html());
		})
		.toArray();
	//console.log(arr);
};

var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/corona', function(req, res) {
	getCountriesData().then(
		value => {
			console.log(arr);
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
			res.header(
				'Access-Control-Allow-Headers',
				'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
			);
			res.send(arr);
		},
		reason => {
			// rejection
		},
	);
});
app.listen(process.env.PORT || 30000);