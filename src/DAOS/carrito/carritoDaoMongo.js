const ContenedorMongo = require("../../contenedor/contenedorMongo");
const carritosSchema = require("../../models/carritosSchema");
const carritos = require("../../models/carritosSchema");
const moment = require("moment");

class CarritosDaoMongo extends ContenedorMongo {
  constructor() {
    super(carritosSchema);
  }

  async saveCarrito(document) {
    let id = 1;
    console.log(document);
    try {
      let content = await this.model
        .find({}, { id: 1, _id: 0 })
        .sort({ id: 1 });

      content.forEach((carrito) => {
        id = carrito.id + 1;
      });

      let date = moment().format("DD-MM-YYYY HH:mm:ss");
      date;
      let carrito = { id: id, date: date, products: [] };
      // content.push(carrito);
      // console.log(carrito);
      this.saveInFile(carrito);
    } catch (error) {
      console.log(`No se pudo guardar: ${error}`);
      return `No se pudo guardar: ${error}`;
    }
  }
  
  async update(carrito, producto) {
    let contentArray = await this.getContentFile();
    let carritoID = await carrito.id;

    console.log(carrito.id);
    console.log(producto);

    await this.model.updateOne(
      { id: carritoID },
      { $set: { products: producto } }
    );
  }
}

module.exports = { CarritosDaoMongo };
