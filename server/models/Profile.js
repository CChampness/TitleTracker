const { Schema, model } = require('mongoose');

// This is a subdocument schema,
//  it won't become its own model
//  but we'll use it as the schema
//  for the User's `profile` in User.js
const profileSchema = new Schema({
  mainInterest: {
    type: String,
  }
});

module.exports = profileSchema;