const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://cchampness:SeaSprite&1977@yourCluster0.n9z04.mongodb.net/sample_mflix?retryWrites=true&w=majority', {
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;

// mongodb+srv://cchampness:SeaSprite&1977@yourCluster0.n9z04.mongodb.net/sample_mflix?retryWrites=true&w=majority'