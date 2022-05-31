const express = require("express");
const { Router } = express;
const productosRouter = Router();

// const { ProductoDaoFile } = require("../DAOS/productos/productosDaoArchivos");
// const producto = new ProductoDaoFile();

// const { ProductosDaoMongo } = require("../DAOS/productos/productosDaoMongo");
// const productos = require("../models/productosSchema");
// const producto = new ProductosDaoMongo();

const {
  ProductoDaoFireBase,
} = require("../DAOS/productos/productosDaoFireBase");
const producto = new ProductoDaoFireBase();

// ---------------------------------------------------------------------------------//
// AGREGAR PRODUCTO
productosRouter.post("/", async (req, res) => {
  let body = await req.body;
  let create = await producto.addProduct(body);
  res.json({ ProductoAgregado: create });
});

// OBTENER TODOS LOS PRODUCTOS
productosRouter.get("/", async (req, res) => {
  let getProductos = await producto.getAll();
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

// PARA ACTUALIZAR CON FIREBASE
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
      stock: req.body.stock
    };
    
  } else {
    resp.json({
      Error: `Falto completar alguno de los campos requeridos`,
    });
  }
  await producto.edit(content, req.params.num);


  resp.json({
    ProductoEditado: content,
  });
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
