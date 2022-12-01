const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const task_model = require("./models");
const private_info = require("./private_info");

const app = express();

app.use(cors());

mongoose.connect(private_info.DATABASE_URL,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
  console.log("Connected Successfully");
});

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

app.get('/fetchTasks', async (request, response) => {
  const tasks = await task_model.find({});
  response.send(tasks);
});

app.post('/delete', async (request, response) => {
  try{
    task_model.deleteOne({task: request.body.task})
    .then(async()=>{
      const tasks = await task_model.find({});
      response.send(tasks);
    });
  } catch (ex) {
    console.log(ex);
  } 
});

app.post('/createNewTask', async (request, response) => {
  try{
    task_model.create({
      task: request.body.task,
      date: request.body.date
    });
    const tasks = await task_model.find({});
    response.send(tasks)
  } catch (ex) {
    console.log(ex);
  }}
  );

app.listen(private_info.port, () => {
  console.log(`Task server listening on port ${private_info.port}!`);
});