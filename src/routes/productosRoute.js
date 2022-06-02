const express = require("express");
const { Router } = express;
const productosRouter = Router();

// BASE DE DATOS EN ARCHIVO
const { ProductoDaoFile } = require("../DAOS/productos/productosDaoArchivos");
const producto = new ProductoDaoFile();

// BASE DE DATOS EN MONGO
// const { ProductosDaoMongo } = require("../DAOS/productos/productosDaoMongo");
// const productos = require("../models/productosSchema");
// const producto = new ProductosDaoMongo();

// BASE DE DATOS EN FIREBASE
// const {
//   ProductoDaoFireBase,
// } = require("../DAOS/productos/productosDaoFireBase");
// const producto = new ProductoDaoFireBase();

// --------------------------------------------------------------------------------//
// AGREGAR PRODUCTO
productosRouter.post("/", async (req, res) => {
  let body = await req.body;
  let create = await producto.addProduct(body);
  res.json({ ProductoAgregado: create });
});

// OBTENER TODOS LOS PRODUCTOS
productosRouter.get("/", async (req, res) => {
  let getProductos = await producto.getContentFile();
  res.json({ TodosLosProductos: getProductos });
});
// OBTENER PRODUCTO POR ID
productosRouter.get("/:num", async (req, res) => {
  let resultado = await producto.getById(req.params.num);
  res.json({ Producto: resultado });
});

// ELIMINAR PRODUCTO POR ID
productosRouter.delete("/:num", async (req, res) => {
  let resultado = await producto.deleteById(req.params.num);
  res.json({ ProductoEliminado: resultado });
});

// EDITAR PRODUCTO
productosRouter.put("/:num", async (req, resp) => {
  let content = null;
  if (
    req.body.title != "" &&
    req.body.price != "" &&
    req.body.descripcion != "" &&
    req.body.foto != "" &&
    req.body.stock != ""
  ) {
    content = {
      title: req.body.title,
      price: req.body.price,
      descripcion: req.body.descripcion,
      foto: req.body.foto,
      stock: req.body.stock,
    };

    let elementoUpdate = await producto.edit(content, req.params.num);

    resp.json({
      ProductoEditado: elementoUpdate,});
  } else {
    resp.json({
      Error: `Falto completar alguno de los campos requeridos`,
    });
  }

  });


// PARA ACTUALIZAR CON MONGO
// productosRouter.put("/:num", async (req, resp) => {
//   let resultado = await producto.edit(
//     req.params.num,
//     req.body.title,
//     req.body.price,
//     req.body.descripcion,
//     req.body.foto,
//     req.body.stock
//   );

//   await producto.edit(resultado)

//   resp.json({
//     ProductoEditado: resultado,
//   });
// });

module.exports = productosRouter;
