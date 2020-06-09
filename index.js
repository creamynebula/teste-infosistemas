const config = require("./utils/config"); //server port and DB address
const express = require("express");
const cors = require("cors"); //cors allow the server to serve requests from outside the server address (ex: from the frontend)
const mongoose = require("mongoose");
const carroRouter = require("./controllers/carros");

const app = express();
app.use(cors());
app.use(express.json()); //activates the json-parser, now requests have a request.body available
//app.use(express.static("build")); //this means we are using our frontend

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Error, not connected to DB :("));

const requestLogger = (request, response, next) => {
  //this one is executed before every route, since we are calling it before the routes
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); //send control to the next middleware, every custom middleware that doesnt return an answer need to end with next();
};
app.use(requestLogger);
app.use("/carros", carroRouter);

const unknownEndpoint = (request, response) => {
  //this middleware has to be declared after the routes, this makes it be called only if no routes handle the request
  response.status(404).send({
    error:
      "Unknown endpoint. Envie seu request para /carros para listar todos os carros.",
  });
};
app.use(unknownEndpoint);

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
