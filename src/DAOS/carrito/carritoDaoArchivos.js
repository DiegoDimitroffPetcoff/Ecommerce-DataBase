const { json } = require("express/lib/response");
const { ContenedorArchivo } = require("../../contenedor/contenedorArchivos");
const moment = require("moment");

class CarritoDaoFile extends ContenedorArchivo {
  constructor() {
    super("./src/data/carrito.txt");
    let films = this.getContentFile;
    this.id = films.length > 0 ? films[films.length - 1].id + 1 : 1;
  }

  saveCarrito(document) {
    let id = 1;

    try {
      let content = this.getContentFile();
      content.forEach((product) => {
        id = product.id + 1;
      });

      let date = moment().format("DD-MM-YYYY HH:mm:ss");
      date;
      let carrito = { id: id, date: date, products: [] };
      content.push(carrito);

      console.log(content);

      this.saveInFile(content);
    } catch (error) {
      console.log(`No se pudo guardar: ${error}`);
      return `No se pudo guardar: ${error}`;
    }
  }

  update(carrito, producto) {
    let contentArray = this.getContentFile();
    console.log(carrito);
    contentArray.forEach((element) => {
      if (element.id == carrito.id) {
        element.products.push(producto);
      }
    });

    this.saveInFile(contentArray);
    return contentArray;
  }

  addProductInCart() {
    let carritoByID = carrito.getById(req.params.num);
    let productoByID = producto.getById(req.body.id);
  }
}

module.exports = { CarritoDaoFile };
