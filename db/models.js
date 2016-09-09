var sequelize = require('./dbconfig.js');
var Sequelize = require('sequelize')
var db = sequelize.sequelize;

// Define user models for each table
exports.Users = db.define('users', {
  id            : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
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
  id            : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  id_user       : { type: Sequelize.INTEGER, references : {model: exports.Users, key:exports.Users.id} },
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
});


exports.Exercises = db.define('exercises', {

  id            :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  name          :Sequelize.STRING,
  type          :Sequelize.STRING,
  description   :Sequelize.STRING,
  id_trainer    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.id} }
})

exports.Workout_list = db.define('workout_list', {

  id            :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  date_created  :Sequelize.DATE,
  comments      :Sequelize.STRING,
  id_user       :{ type: Sequelize.INTEGER, references : {model: exports.Users, key:exports.Users.id} },
  id_trainer    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.id} },
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE

})
exports.Workouts = db.define('workouts', {
  id              :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  id_workout_list :{ type: Sequelize.INTEGER, references : {model: exports.Workout_list, key:exports.Workout_list.id} },
  comments        :Sequelize.STRING,
  id_exercises    :{ type: Sequelize.INTEGER, references : {model: exports.Exercises, key:exports.Exercises.id} },
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
})

exports.Trainer_Client = db.define('trainer_client', {
  id              :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
})
// link relationships for junction table
exports.Users.belongsToMany(exports.Trainers, {through:'trainer_client', foreignKey: exports.id_user});
exports.Trainers.belongsToMany(exports.Users, {through:'trainer_client', foreignKey:exports.id_trainer});

