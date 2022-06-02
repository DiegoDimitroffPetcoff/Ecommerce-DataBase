const express = require("express");
const { Router } = express;
const carritosRouter = Router();


//BASE DE DATOS EN ARCHIVO
const { CarritoDaoFile } = require("../DAOS/carrito/carritoDaoArchivos");
const carrito = new CarritoDaoFile();

//BASE DE DATOS EN MONGO
// const { CarritosDaoMongo } = require("../DAOS/carrito/carritoDaoMongo");
// const carritos = require("../models/carritosSchema");
// const carrito = new CarritosDaoMongo();

//BASE DE DATOS EN FIRESTORE
// const { CarritoDaoFireBase } = require("../DAOS/carrito/carritoDaoFireBase");
// const carrito = new CarritoDaoFireBase();
// const {  ProductoDaoFireBase} = require("../DAOS/productos/productosDaoFireBase");
// const producto = new ProductoDaoFireBase();


// --------------------------------------------------------------------------------//
// AGREGAR UN CARRITO
carritosRouter.post("/", async (req, res) => {
  let carritoBody = { products: [] };
  await carrito.saveCarrito(carritoBody);
  res.json({ CarritoGuardado: `Se ha creado un Nuevo Carrito. ` });
});

// AGREGAR UN PRODUCTO A UN CARRITO
carritosRouter.post("/:num", async (req, res) => {
  let carritoByID = await carrito.getById(req.params.num);
  let productoByID = await producto.getById(req.body.id);

  let productoA = productoByID.data;

  resultado = await carrito.update(productoA, carritoByID);
});

// OBTENER TODOS LOS CARRITOS
carritosRouter.get("/", async (req, res) => {
  res.json({ TodosLosCarritos: await carrito.getAll() });
});

// OBTENER LOS CARRITOS POR ID
carritosRouter.get("/:num", async (req, res) => {
  let resultado = await carrito.getById(req.params.num);
  res.json({ Carrito: resultado });
});

// PARA ELIMINAR UN CARRITO
carritosRouter.delete("/:num", async (req, res) => {
  let respuesta = await carrito.deleteById(req.params.num);
  res.json({ CarritoEliminado: respuesta });
});

// Para editar un producto en un carrito especifico:
carritosRouter.put("/:num", async (req, res) => {
  res.json({ CarritoEditado: carrito.updateById(req.params.num, req.body) });
});

module.exports = carritosRouter;
