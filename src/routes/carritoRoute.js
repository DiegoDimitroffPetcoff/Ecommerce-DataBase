const express = require("express");
const { Router } = express;
const carritosRouter = Router();

// const { CarritoDaoFile } = require("../DAOS/carrito/carritoDaoArchivos");
// const carrito = new CarritoDaoFile();

const { CarritosDaoMongo } = require("../DAOS/carrito/carritoDaoMongo");
const carritos = require("../models/carritosSchema");
const carrito = new CarritosDaoMongo();

// const { CarritoDaoFireBase } = require("../DAOS/carrito/carritoDaoFireBase");
// const carrito = new CarritoDaoFireBase();

// OBTENER TODOS LOS CARRITOS
carritosRouter.get("/", async (req, res) => {
  console.log(await carrito.getAll());
  res.json({ TodosLosCarritos: await carrito.getAll() });
});

// OBTENER LOS CARRITOS POR ID
carritosRouter.get("/:num", async (req, res) => {
  let resultado = await carrito.getById(req.params.num);
  res.json({ Carrito: resultado });
});

// AGREGAR UN CARRITO
carritosRouter.post("/", async (req, res) => {
  let carritoBody = { products: [] };

  await carrito.saveCarrito(carritoBody);

  res.json({ CarritoGuardado: `Se ha creado un Nuevo Carrito. ` });
});

// AGREGAR UN PRODUCTO A UN CARRITO 
carritosRouter.post("/:num", async (req, res) => {
  let todosLosCarritos = [];
  let id = req.params.num;

  todosLosCarritos = await carrito.getAll();

  todosLosCarritos.forEach((element) => {
    //  element = element
    if (element.id == id) {
      // element = req.body

      // todosLosCarritos.push(producto)
      element.data.products = req.body;
      console.log(element);
      carrito.saveCarrito(element);
    }
  });
  console.log(todosLosCarritos);

  res.json({ CarritoGuardado: `Se ha creado un Nuevo Carrito. ` });
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
