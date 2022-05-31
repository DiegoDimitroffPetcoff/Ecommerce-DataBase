const mongoose = require("mongoose");

const carritosCollection = 'carrito';

const CarritosSchema = new mongoose.Schema({
    title: {type:String,require:true,max:100},
    price: {type:Number,require:true}, 
    descripcion: {type:String,require:true,max:100}, 
    foto: {type:String,require:true,max:100}, 
    stock: {type:Number,require:true,max:100},
    id: {type:Number,require:true},
    
})

const carritos = mongoose.model(carritosCollection, CarritosSchema);

module.exports = carritos