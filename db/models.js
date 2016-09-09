var sequelize = require('./dbconfig.js');
var Sequelize = require('sequelize')
var db = sequelize.sequelize;

// Define user models for each table
exports.Users = db.define('users', {
  userId        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  fb_id         : Sequelize.INTEGER,
  first_name    : Sequelize.STRING,
  last_name     : Sequelize.STRING,
  username      : Sequelize.STRING,
  address       : Sequelize.STRING,
  phone_number  : Sequelize.STRING,
  email         : Sequelize.STRING,
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
});

exports.Trainers = db.define('trainers', {
  trainerId     : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  id_user       : { type: Sequelize.INTEGER, references : {model: exports.Users, key:exports.Users.userId} },
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
});

//TODO add exercises table
// exports.Exercises = db.define('exercises', {

//   exerciseId    :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
//   name          :Sequelize.STRING,
//   type          :Sequelize.STRING,
//   description   :Sequelize.STRING,
//   id_trainer    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.trainerId} }
// })

exports.Workoutlist = db.define('workout_list', {

  workoutlistId :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  date_created  :Sequelize.DATE,
  comments      :Sequelize.STRING,
  userId        :{ type: Sequelize.INTEGER, references : {model: exports.Users, key:exports.Users.userId} },
  trainerId    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.trainerId} },
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE

})
exports.Workouts = db.define('workouts', {
  id              : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  workoutlistId   : { type: Sequelize.INTEGER, references : {model: exports.Workout_list, key:exports.Workoutlist.workoutlistId} },
  comments        : Sequelize.STRING,
  exercise_name   : Sequelize.STRING,
  // excerciseId    :{ type: Sequelize.INTEGER, references : {model: exports.Exercises, key:exports.Exercises.id} },
  createdAt       : Sequelize.DATE,
  updatedAt       : Sequelize.DATE
})

exports.Trainer_Client = db.define('trainer_client', {
  id              :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
})
// link relationships for junction table
exports.Users.belongsToMany(exports.Trainers, {through:'trainer_client', foreignKey: exports.id_user});
exports.Trainers.belongsToMany(exports.Users, {through:'trainer_client', foreignKey:exports.id_trainer});

