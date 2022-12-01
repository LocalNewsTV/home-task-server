const mongoose = require("mongoose");
const MyFavouritesSchema = new mongoose.Schema( {
  task: {
    type: 'String',
    required: true
  },
  date: {
    type: 'String',
    required: true
  }
});

const tasks = mongoose.model("Tasks", MyFavouritesSchema);

module.exports = tasks;