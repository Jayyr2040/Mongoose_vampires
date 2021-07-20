/**********************************************************************
Set up and Configuration
**********************************************************************/
// node app.js will disconnect if the query is invalid

/*
db.component.find(
  { specification : { $elemMatch : { memory_speed : "336 Gbps"} } }
).pretty();
*/

// Dependencies
const mongoose = require('mongoose');
const seedData = require('./models/seed_vampires.js');
const Vampire = require('./models/vampire.js');

// Configuration
const mongoURI = 'mongodb://localhost:27017/'+ 'vampires';
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, // no need this also can
    () => {
      console.log("the connection with mongod is established");
    }
  );

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on( 'open' , ()=>{
  console.log('Connection made!');
});

/**********************************************************************
Write Your Code Below
**********************************************************************/

/* Vampire.insertMany(seedData, (error, vampires) => {
    if (error) {
      console.log(error);
    } else {
      console.log(vampires);
    }
    db.close();
  }); */

 /*  Vampire.remove({}, (err, vampires) => {
    if (err) {
      console.log(err);
    } else {
      console.log("This is the deleted vampire:", vampires);
    }
    db.close();
  }); */

 /*  Vampire.find({title:"Water"},"title body likes", (err,vampires) => {
    console.log(vampires);
    db.close();
});
 */
/* Vampire.findOneAndUpdate(
    { hair_color: "brown" },     // crtieria to find
    { victims: 50,},    // what to update
    { new: true },          // options new tweet being passed in = true, false is old
    (err, vampires) => {       // call back
      if (err) {
        console.log(err);
      } else {
        console.log(vampires);
      }
      db.close();
    }
  ); */

// have greater than 500 victims
/*   Vampire.find({victims:{$gt: 500}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

// Find all the vampires that that are females
/* Vampire.find({gender:"f"}, (err,vampires) => {
    console.log(vampires);
    db.close();
}) */

// have fewer than or equal to 150 victims
/* Vampire.find({victims:{$lte: 150}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}) */

// have greater than 150 AND fewer than 500 victims
/* 
Vampire.find({victims:{$lt: 500, $gt:150}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}) */

// have a victim count is not equal to 210234
/* Vampire.find({victims:{$ne: 210234}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}) */

///////////////////////// SELECT BY EXISTS OR DOES NOT EXIST///////////////////////////////////////

// have a key of 'title'
/* Vampire.find({title: { $exists: true }}, (err,vampires) => {
    console.log(vampires);
    db.close();
}) */

// have a key of 'victims'
/* Vampire.find({victims: { $exists: false }}, (err,vampires) => {
    console.log(vampires);
    db.close();
}) */

//have a title AND no victims
/* Vampire.find({victims: { $exists: false },title: { $exists: true }}, (err,vampires) => {
    console.log(vampires);
    db.close();
}) */

// have victims AND the victims they have are greater than 1000
/* Vampire.find({victims: { $exists: true }, victims: { $lte: 1000 }}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

/////////////////////////////////////////SELECT WITH OR ////////////////////////////////

// are from New York, New York, US or New Orleans, Louisiana, US
/* Vampire.find({$or: [{ location: "New York, New York, US" }, { location: "New Orleans, Louisiana, US" }]}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

// love brooding or being tragic
/* 
Vampire.find({ loves: {$in : ["brooding","being tragic"] }}, (err,vampires) => {
  console.log(vampires);
  db.close();
}) */

// have more than 1000 victims or love marshmallows
/* Vampire.find({$or: [{ victims: {$gt: 1000} }, { loves: "marshmallows" }]}, (err,vampires) => {
    console.log(vampires);
    db.close();
});

// have red hair or green eyes
Vampire.find({$or: [{ eye_color: "green" }, { hair_color: "red" }]}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

////////////////////////////////Select objects that match one of several values////////////////

// love either frilly shirtsleeves or frilly collars
/* Vampire.find({loves: {$in:["frilly shirtsleeves","frilly collars"]}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

// love brooding
/* Vampire.find({loves: {$in:["brooding"]}}, (err,vampires) => {
    console.log(vampires);
    db.close();
});
 */

// love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music
/* Vampire.find({loves: {$in:["lurking in rotting mansions","appearing innocent","trickery","R&B music"]}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

// love fancy cloaks but not if they also love either top hats or virgin blood * Hint-You will also have to use $nin *
/* Vampire.find({loves: {$in:["fancy cloaks"], $nin:["top hats","virgin blood"]}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

///////////////////////// NEGATIVE SELECTION///////////////////////////////////////////////////

// love ribbons but do not have brown eyes
/* Vampire.find({loves: {$in:["ribbons"]}, eye_color: {$not: {$eq: "brown" }}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */


/* // are not from Rome
Vampire.find({location: {$not:{$eq: "Rome"}}}, (err,vampires) => {
    console.log(vampires);
    db.close();
}); */

// do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]
/* Vampire.find({loves: {$nin:["fancy cloaks", "frilly shirtsleeves", "appearing innocent", "being tragic", "brooding"]}}, (err,vampires) => {
  console.log(vampires);
  db.close();
});
 */

//have not killed more than 200 people
/* Vampire.find({victims: {$lt: 200}}, (err,vampires) => {
  console.log(vampires);
  db.close();
});
 */

////////////// REPLACE ///////////////////////////////////////////

//replace the vampire called 'Claudia' with a vampire called 'Eve'. 'Eve' will have a key called 'portrayed_by' with the value 'Tilda Swinton'
/* Vampire.replaceOne({name: "Claudia"},{ name: "Eve", portrayed_by: 'Tilda Swinton'}, (err,vampires) => {
  console.log(vampires);
  db.close();
});
 */

//replace the first male vampire with another whose name is 'Guy Man', and who has a key 'is_actually' with the value 'were-lizard'
/* Vampire.replaceOne({gender: 'm'},{ name: "Guy Man", is_actually: 'were-lizard'}, (err,vampires) => {
  console.log(vampires);
  db.close();
}); */

////////////// UPDATE ////////////////////////////////////////////////
// Update 'Guy Man' to have a gender of 'f'
/* 
Vampire.findOneAndUpdate(
    { name: "Guy Man" },     // crtieria to find
    { gender: 'f'},    // what to update
    { new: true },          // options new tweet being passed in = true, false is old
    (err, vampires) => {       // call back
      if (err) {
        console.log(err);
      } else {
        console.log(vampires);
      }
      db.close();
    }
  );  */

//   Update 'Eve' to have a gender of 'm'
 /*  Vampire.updateOne({name: 'Eve'},{gender: 'm'}, (err,vampires) => {
    console.log(vampires);
    db.close();
  }); */

// Update 'Guy Man' to have an array called 'hates' that includes 'clothes' and 'jobs'
/* Vampire.findOneAndUpdate(
    { name: "Guy Man" },     // crtieria to find
    { hates: 'f'},    // what to update
    { new: true },          // options new tweet being passed in = true, false is old
    (err, vampires) => {       // call back
      if (err) {
        console.log(err);
      } else {
        console.log(vampires);
      }
      db.close();
    }
  ); */


  //Update 'Guy Man' to have an array called 'hates' that includes 'clothes' and 'jobs'
  // need to add new field to schema and then $set below
/*   Vampire.updateOne({name: 'Guy Man'},{$set : { hates: ['clothes','jobs']}},  (err,vampires) => {
    console.log(vampires);
    db.close();
  }); */

  //Update 'Guy Man's' hates array also to include 'alarm clocks' and 'jackalopes'
 /*  Vampire.updateOne({name: 'Guy Man'},{$push : { hates: ['alarm clocks','jackalopes']}},  (err,vampires) => {
    console.log(vampires);
    db.close();
  });
 */

  //Rename 'Eve's' name field to 'moniker'
  /* Vampire.updateOne({name: 'Eve'},{$rename : { 'name': 'moniker'}},  (err,vampires) => {
    console.log(vampires);
    db.close();
  }); */

//We now no longer want to categorize female gender as "f", but rather as fems. Update all females so that the they are of gender "fems". 
/*   Vampire.updateMany({gender: 'f'},{gender : 'fems'},  (err,vampires) => {
    console.log(vampires);
    db.close();
  }); */

//////////////////////////// REMOVE//////////////////////////////////////////////////////////////////

//Remove a single document wherein the hair_color is 'brown'
 /*  Vampire.deleteOne({hair_color: 'brown'}, (err, vampires
    ) => {
   console.log(vampires);
    db.close();
  }); */

//We found out that the vampires with the blue eyes were just fakes! Let's remove all the vampires who have blue eyes from our database.
/* Vampire.deleteMany({eye_color: 'blue'}, (err, vampires
  ) => {
 console.log(vampires);
  db.close();
}); */