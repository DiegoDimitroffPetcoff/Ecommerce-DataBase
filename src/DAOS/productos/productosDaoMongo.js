const ContenedorMongo = require("../../contenedor/contenedorMongo");
const productoSchema = require("../../models/productosSchema");
const productos = require("../../models/productosSchema");

class ProductosDaoMongo extends ContenedorMongo {
  constructor() {
    super(productoSchema);
  }
  async addProduct(x) {
    // PRODUCTO CREADO CON ID AUTOINCREMENTAL SEGUN EL ULTIMO OBJETO GUARDADO EN COLECCION
    let productosId = await productos
      .find({}, { id: 1, title: 1, _id: 0 })
      .sort({ id: 1 });
    let idMayor = productosId[productosId.length - 1];
    let idAsignado = idMayor.id + 1;
    let producto = x;
    console.log(x);
    producto.id = idAsignado;
    const productoAgregado = producto;
    const createModel = new productos(productoAgregado);
    const create = await createModel.save();
    console.log(createModel);
    return create;
  }

  async edit(id, title, price, descripcion, foto, stock) {
    let allProducts = await productos.updateOne(
      { id: id },
      {
        $set: {
          title: title,
          price: price,
          descripcion: descripcion,
          foto: foto,
          stock: stock,
        },
      }
    );

    let productosId = await productos.find(
      { id: id },
      { id: 1, title: 1, price: 1, descripcion: 1, foto: 1, stock: 1, _id: 0 }
    );
    console.log(productosId);

    return productosId;
  }
}

module.exports = { ProductosDaoMongo };
