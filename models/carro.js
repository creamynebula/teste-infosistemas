const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const carroSchema = mongoose.Schema({
  placa: { type: String, required: true, unique: true },
  chassi: { type: String, required: true, unique: true },
  renavam: { type: String, required: true, unique: true },
  modelo: { type: String, required: true, unique: false },
  marca: { type: String, required: true, unique: false },
  ano: { type: String, required: true, unique: false },
});

carroSchema.plugin(uniqueValidator); //now error is thrown if we try to add a 'carro' not obeying to the rules

carroSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.blogId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Carro", carroSchema);
