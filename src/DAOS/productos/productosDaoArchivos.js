const { ContenedorArchivo } = require("../../contenedor/contenedorArchivos");
const fs = require("fs");
const moment = require("moment");
const { fork } = require("child_process");
const { title } = require("process");

class ProductoDaoFile extends ContenedorArchivo {
  constructor() {
    super("./src/data/productosStorage.txt");
    let films = this.getAll();
    this.id = films.length > 0 ? films[films.length - 1].id + 1 : 1;
  }

  addProduct(product) {
    let id = null;
    let content = this.getContentFile();
    content.forEach((product) => {
      id = product.id + 1;
    });
    let date = moment().format("DD-MM-YYYY HH:mm:ss");
    product.date = date;
    product.id = id;
    content.push(product);

    this.saveInFile(content);

    return product;
  }

  getAll() {
    let content = this.getContentFile();

    return content;
  }
  deleteById(x) {
    let y = x;
    let array = this.getContentFile();
    array.forEach((element) => {
      if (element.id == y) {
        let id = element.id - 1;
        let removed = array.splice(id, 1);
        this.saveInFile(array);
      }
    });
    return "You just deleted product with Id Number: " + x;
  }
  edit(content, id) {
    let elementoUpdate = null;

    let allProducts = this.getContentFile();

    allProducts.forEach((element) => {
      if (element.id == id) {
        element.title = content.title;
        element.price = content.price;
        element.descripcion = content.descripcion;
        element.foto = content.foto;
        element.stock = content.stock;
        let date = moment().format("DD-MM-YYYY HH:mm:ss");
        element.Update = date;
        elementoUpdate = element;
      }
    });

    this.saveInFile(allProducts);

    return elementoUpdate;
    ("");
  }
}

module.exports = { ProductoDaoFile };
