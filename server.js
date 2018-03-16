var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('librarydb', ['librarydb']);
var bodyParser = require('body-paraser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/librarydb',function (req, res) {
	console.log("Received a GET request");

	db.librarydb.find(function (err,docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/librarydb', function (req,res){
	console.log(req.body);
	db.librarydb.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/librarydb/:id', function(req,res) {
	var id = req.params.id;
	console.log(id);
	db.librarydb.remove({_id: mongojs.ObjectId(id)},function (err,doc) {
		res.json(doc);
	});
});

app.get('/librarydb/:id', function(req,res) {
	var id = req.params.id;
	console.log(id);
	db.librarydb.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {
		res.json(doc);
	})
})

app.put('/librarydb/:id', function (req,res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.librarydb.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {title: req.body.title, author: req.body.author, publisher: req.body.publisher, published_year: req.body.published_year, cost: req.body.cost}},
		new: true}, function (err,doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log("server running on port 3000");