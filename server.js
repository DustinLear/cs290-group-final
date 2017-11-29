console.log("Server JavaScript start.");
var fs = require('fs');
var path = require('path');
//var http = require('http') //we may not need the HTTP module
var MongoClient = require('mongodb').MongoClient, test = require('assert');
var handlebars = require('handlebars');
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var stashData = require('./stashData');
var postData = require('./postData');
var commentData = require('./commentData');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.use(bodyParser.json());

// app.get('/', function(req, res) {
	// res.status(200).render('stashPage', {stashes: stashData});
// })

// app.get('/posts', function(req, res) {
	// res.status(200).render('postPage', {posts: postData});
// })

// app.get('/comments', function(req, res) {
	// res.status(200).render('commentPage', {posts: [postData["Cat"]], comments: commentData});
// })

//additional pages go here

// app.use(express.static('public'));

// app.get('*', function(req, res) {
	// res.status(404).render('404Page');
// });


// ///////////////////////////////////////////////
// ////*Code Related to connecting to MongoDB*////
// ///////////////////////////////////////////////
// //pull password from database from a special file in parent directory of current directory
// /*
// var databasePassword = fs.readFileSync('../database-pass.txt', 'utf8')
// var databaseConnectionString = "mongodb://HauntedWAMPUS:" + databasePassword + "@cluster0-shard-00-00-pdrgi.mongodb.net:27017,cluster0-shard-00-01-pdrgi.mongodb.net:27017,cluster0-shard-00-02-pdrgi.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
// */
// /*
// *
// *
// *insert MongoDB code here (the "MongoClient" variable
// *
// *
// */
// /*
// MongoClient.connect(databaseConnectionString, function(err, db) {
// 	test.equal(null, err);
// 	if(err){
// 		throw err;
// 	}
// 	console.log("Successfully connected to MongoDB!");
// });
// */
//


//check if stash is in database
function isStashNameInDatabase(stashName){
	//RETURN A BOOLEAN TRUE STASH IS IN DATABASE
}

//check if post is in database
function isPostInDatabase(stashName, postID){
	//RETURN A BOOLEAN TRUE POST IS IN STASH IN THE DATABASE
}

function addStashToDatabase(/*parameters*/){
	//ADDS STASH TO DATABASE
}

function addPostToStashInDatabase(/*paramaeters*/){
	//ADDS POST TO STASH IN DATABASE
}

function addCommentToPostInDatabase(/*paramaeters*/){
	//ADDS COMMENT TO POST INSIDE CORRECT STASH IN DATABASE
}

// //////////////////////////////////////
// ////*Express Middleware Functions*////
// //////////////////////////////////////

app.use(bodyParser.json());

//a catch all for any http DELETE requests.  WE DO NOT ALLOW ANY DELETE REQUEST
app.delete('*', function (req, res, next) {
	console.log('Server received "' + req.method + '" request on the URL "' + req.url + '" --METHOD NOT ALLOLWED');
	res.status(405).send("DELETE is not allowed.");//note that status code 405 = Method not alowed
});


app.use(express.static('public'));

app.get('/', function (req, res, next) {
	req.url = '/stash';//if url is home directory change it to /stash so next middleware function can catch it
	next();
});

app.get('/stash', function (req, res, next) {
	console.log('Server received "' + req.method + '" request on the URL "' + req.url + '" --page found');
	var content = {stashes: /*GET ALL STASHES FROM THE SERVERS AND PUT THEM HERE*/};
	res.status(200).render('stashPage', content);
});

app.get('/stash/:stashName', function (req, res, next) {
	var stashName = req.params.stashName;
	if(isStashNameInDatabase(stashName)){
		console.log('Server received "' + req.method + '" request on the URL "' + req.url + '" --page found');
		var content = {posts: /*GET THIS STASH's POSTS FROM THE DATABASE AND PUT THEM HERE*/};
		res.status(200).render('postPage', content);
	}
});

app.get('/stash/:stashName/:postId', function (req, res, next) {
	var stashName = req.params.stashName;
	var postId = req.params.postId;
	if(isStashNameInDatabase(stashName)){
		if(isPostInDatabase(stashName, postId){
			console.log('Server received "' + req.method + '" request on the URL "' + req.url + '" --page found');
			var content = /*JSON FORM OF CORRECT DYNAMIC CONTENT FOR COMMENT PAGE*/;
			res.status(200).render('commentPage', content);
		}
	}
});



//catch any http get method with a path that can not be resolved above
app.get('*', function (req, res, next) {
	console.log('Server received "' + req.method + '" request on the URL "' + req.url + '" --PAGE NOT FOUND -- sent contents of 404.html');
	res.status(404).render(/*TEMPLATE NAME*/);
});
/*
*
*add catch alls for other HTTP request methods if needeed
*
*/




// //The default port for serve is 3117. However, the server will run with the port specified in the environment variable PORT if PORT is an environment variable
var port = 3117; // Dustin:  I chose port 3117 because the engr server is haviing too many people from this class tryimng to use port 3000
if(process.env.PORT){
	port = process.env.PORT;
}
//start server
app.listen(port, function () {
    /*
	*insert callback code here
	* ----note we may not need anything here-----
	*/
	console.log("---Server is listening on port ", port);
});
