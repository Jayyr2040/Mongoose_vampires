const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html
const VampireSchema = new Schema(
  {
    name: { type: String, required: true},
    title: String,
    hair_color: { type: String, default: 'Blond' },
    eye_color: String,
    dob: Date,
    loves: [{type: String}],
    location: String,
    gender: String,
    victims: {type: Number, min: 0},
    hates : [String]
  }
);

// Creating Tweet model : We need to convert our schema into a model-- will be stored in 'tweets' collection.  Mongo does this for you automatically
// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// from here: https://mongoosejs.com/docs/models.html
const Vampire = mongoose.model("Vampire", VampireSchema); // capital T for class
// use same Tweet and "Tweet"

//make this exportable to be accessed in `app.js`
module.exports = Vampire;