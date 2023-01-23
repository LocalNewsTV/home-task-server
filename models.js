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

const tasks_model = mongoose.model("Tasks", MyFavouritesSchema);
const groceries_model = mongoose.model("Groceries", MyFavouritesSchema)
module.exports.tasks_model = tasks_model;
module.exports.groceries_model = groceries_model;