const mongoose = require("mongoose");

const carritosCollection = "carrito";

const CarritosSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  date: { type: String, require: false, max: 100 },
  products: { type: Array, require: true, max: 100 },
});

const carritos = mongoose.model(carritosCollection, CarritosSchema);

module.exports = carritos;
