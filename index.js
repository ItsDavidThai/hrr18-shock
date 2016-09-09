var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || '8080';
var models = require('./db/models.js')
var db = require('./db/dbconfig.js')
var controller = require('./controllers/mainController.js')
app.use(express.static('app'));
app.use(bodyParser.json());
// During my MVP, an HIR told me I should always use static when creating a Single Page App.

// original code Roni wrote
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

app.post('/fetchUser', function(req, res){
  // DB helper function to retrieve user by name or id
  console.log(req.body)
  controller.usersView.userLogin(req, res)
})
app.post('/fetchTrainer', function(req, res){
  // DB helper function to retrieve user by name or id
  controller.usersView.trainerLogin(req, res)
})
app.post('/create', function(req, res){
  // DB helper function to create a new user
})
app.get('/displayTrainers', function(req, res){
  controller.usersView.displayTrainers(req, res)
})
// Workout Listeners

app.post('workout')



// Sync models with database then open port
db.sequelize.sync().then(function() {
  console.log(port)
  app.listen(port, function () {
    console.log(port,' is running fine!');
  });
}).catch(function(err){
  console.log(err)
});
