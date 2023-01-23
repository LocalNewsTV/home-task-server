const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const models = require('./models');
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

app.get('/todo/fetchTasks', async (request, response) => {
  const tasks = await models.tasks_model.find({});
  response.send(tasks);
});

app.post('/todo/delete', async (request, response) => {
  try{
    models.tasks_model.deleteOne({task: request.body.task})
    .then(async()=>{
      const tasks = await models.tasks_model.find({});
      response.send(tasks);
    });
  } catch (ex) {
    console.log(ex);
  } 
});

app.post('/todo/createNewTask', async (request, response) => {
  console.log(request.body)
  try{
    models.tasks_model.create({
      task: request.body.task,
      date: request.body.date
    });
    const tasks = await models.tasks_model.find({});
    response.send(tasks)
  } catch (ex) {
    console.log(ex);
  }}
  );


  app.get('/grocery/fetchTasks', async (request, response) => {
    const tasks = await models.groceries_model.find({});
    response.send(tasks);
  });
  
  app.post('/grocery/delete', async (request, response) => {
    try{
      models.groceries_model.deleteOne({grocery: request.body.task})
      .then(async()=>{
        const tasks = await models.groceries_model.find({});
        response.send(tasks);
      });
    } catch (ex) {
      console.log(ex);
    } 
  });
  
  app.post('/grocery/createNewTask', async (request, response) => {
    try{
      models.groceries_model.create({
        task: request.body.task,
        date: request.body.date
      });
      const tasks = await models.groceries_model.find({});
      response.send(tasks)
    } catch (ex) {
      console.log(ex);
    }}
    );
  

app.listen(private_info.port, () => {
  console.log(`Task server listening on port ${private_info.port}!`);
});