const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://cchampness:SeaSprite&1977@Cluster0.n9z04.mongodb.net/shrouded-meadow-26197r?retryWrites=true&w=majority', {
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;

// mongodb+srv://cchampness:SeaSprite&1977@Cluster0.n9z04.mongodb.net/TitleTracker?retryWrites=true&w=majority'