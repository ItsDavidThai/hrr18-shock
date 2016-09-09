var models = require('../db/models.js');
// client to database methods

//TODO:
/*
Grab All Trainers in sign up page;
Add FB ID to the database
*/
module.exports = {
  trainersView:{
    // done away with adding clients
    // addClient: function(req, res){
    //   models.Users.findOrCreate({where:{
    //     $or:[
    //       {
    //         username: req.username
    //       },
    //       {
    //         email: req.email
    //       }
    //     ] }, defaults: {
    //       first_name: req.firstName, last_name:req.lastName, address:req.address, phone_number:req.phoneNumber, email:req.email, username:req.username
    //     }
    //   }).then(function(user){
    //     res.send(user)
    //   });
    // },
    // searchClients: function(req, res){

    // },
    createWorkouts: function(req, res){

    },
    viewWorkouts: function(req, res){

    }

  },
  clientsView:{
    grabWorkouts: function(req, res){

    }
  },
  usersView:{
    // params is an object that contains the properties of the user
    // models.Users.create({first_name:params.firstName, last_name:params.lastName, username:params.username, address:params.address, phone_number:params.phoneNumber, email:params.email})
    // TODO: add trainer during signup for now
    displayTrainers: function(){

    },
    selectTrainer: function(){

    },
    signUp: function(req, res){
      models.Users.findOrCreate({where:{
        $or:[
          {
            username: req.username
          },
          {
            email: req.email
          }
        ] }, defaults: {
          first_name: req.firstName, last_name:req.lastName, address:req.address, phone_number:req.phoneNumber, email:req.email, username:req.username
        }
      }).then(function(user){
        // res.send(user)
      });
    },
    userLogin: function(req, res){
      models.Users.find({where:{
        $or:[
          {
            username: req.body.username
          },
          {
            email: req.body.email
          }
        ] }
      }).then(function(user){
        if(user){
          res.send(user)
        } else {
          res.send('invalid user')
        }
      }).catch(function(err){
        res.send('invalid user')
        console.log(err)
      });
    },
    trainerLogin: function(req, res){
      models.Users.find({where:{
        $or:[
          {
            username: req.body.username
          },
          {
            email: req.body.email
          }
        ] }
      }).then(function(user){
        console.log(user.dataValues.id)
        models.Trainers.findOne({where:
          {id_user: user.dataValues.id}
        }).then(function(trainer){
          console.log(trainer)
          if(trainer){
            res.send(trainer)
            // res.send('trainer has been found')
          } else {
            res.send('not trainer')
          }
        }).catch(function(err){
          //this catch statement doesnt seem to be working
          console.log(err)
          // res.send('not a trainer')
        })
      }).catch(function(err){
        res.send('invalid user')
        console.log(err)
      });
    }
  },
  exercises:{

  }


}



//testing grounds ignore past this point
// working method


      // models.Trainer_Client.find({/*include:[models.Users],*/ where:{
      //     $or:[
      //         {
      //           trainerId: 2
      //         }
      //     ]
      //   }
      // }).then(function(user){
      //   console.log(user)
      // });
/*personParams = {firstName:'kale', lastName:'evad', username:'kaleevad1', address:'9521 hello world', phoneNumber:'110399123', email:'kaleevade1@gmail.com'}
// sample data inserts
// this query creates a user
models.Users.create({first_name:'david', last_name:'dave', username:'helloworld', address:'1234 hello world', phone_number:3214443333, email:'helloworld@gmail.com'})
models.Users.create({first_name:'inor', last_name:'mes', username:'inormes', address:'1234 inormes', phone_number:'13546665', email:'inormes@gmail.com'})
module.exports.usersView.signUp(personParams)


// this query sets the user as a trainer
models.Trainers.create({id_user:1})
// this creates the trainer client relationship
// for some reason the forerign key gets changed to userId and trainer Id
models.Trainer_Client.create({userId:2, trainerId:2})

models.Workout_list.create({
  comments:'great workout day 1', id_user:2, id_trainer:2
})

models.Workouts.create({
  comments:'5x10', id_workout_list: 4
})


*/

models.Trainers.findAll({ include:[models.Users] }).then(function(trainers){
  console.log(JSON.stringify(trainers))})






