const { ContenedorArchivo } = require("../../contenedor/contenedorArchivos");
// const { ContenedorArchiv2 } = require('../../data/productosStorage')

class ProductoDaoFile extends ContenedorArchivo {
  constructor() {
    super("./src/data/productosStorage.txt");
    let films = this.getAll();
    this.id = films.length > 0 ? films[films.length - 1].id + 1 : 1;
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
        this.saveInFile(array)
        
      }
    });
    return "You just deleted product with Id Number: " + x;
  }

  edit(id, nombre, price, descripcion, foto, stock) {
    let y = id;
    let allProducts = this.getContentFile();

    allProducts.forEach((element) => {
      if (element.id == y) {
        if (nombre !== "") {
          element.title = nombre;
        }

        if (price !== "") {
          element.price = price;
        }

        if (descripcion !== "") {
          element.descripcion = descripcion;
        }

        if (foto !== "") {
          element.foto = foto;
        }

        if (stock !== "") {
          element.stock = stock;
        }

        element.ModificatedTimestamp = new Date();
        element.ModificatedTimestamp += element.ModificatedTimestamp.getTime();
      }
    });
    this.saveInFile(allProducts);
    console.log(allProducts);
    return allProducts[id - 1];
  }
}

module.exports = { ProductoDaoFile };
