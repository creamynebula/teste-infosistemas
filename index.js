require("dotenv").config();
const express = require("express");
const cors = require("cors"); //cors allow the server to serve requests from outside the server address (ex: from the frontend)

const app = express();
app.use(cors());
app.use(express.json()); //activates the json-parser, now requests have a request.body available

const requestLogger = (request, response, next) => {
  //this one is executed before every route, since we are calling it before the routes
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); //send control to the next middleware, every custom middleware that doesnt return an answer need to end with next();
};

app.use(requestLogger);

app.get("/carros", (request, response));
