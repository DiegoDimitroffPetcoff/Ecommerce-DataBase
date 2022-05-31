const { json } = require("express/lib/response");
const { ContenedorArchivo } = require("../../contenedor/contenedorArchivos");

class CarritoDaoFile extends ContenedorArchivo {
  constructor() {
    super("./src/data/carrito.txt");
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
        this.saveInFile(array);
      }
    });
    return "You just deleted product with Id Number: " + x;
  }

  updateById(id, content) {
    let contentArray = this.getContentFile();
    // let index = contentArray.findIndex((elem) => {
    //   elem.id === id;
    // });
    let productosEnCarrito = null;
    console.log(contentArray);
    contentArray.forEach((element) => {
      if (element.id == id) {
        productosEnCarrito = element.products;
        let contentParse = content;

        // previa = productosEnCarrito[conten.id - 1];
        //  previa = contentParse;
        element.products[content.id - 1] = contentParse;

        console.log(contentArray);
      }
    });

    this.saveInFile(contentArray);
    return contentArray;
  }

  //       element.ModificatedTimestamp = new Date();
  //       element.ModificatedTimestamp += element.ModificatedTimestamp.getTime();
}

module.exports = { CarritoDaoFile };

// YA TENGO TODO PARA AGREGAR--
// updateById(id, content) {
//     let contentArray = this.getContentFile();

//     let index = contentArray.findIndex((elem) => {
//       elem.id === id;
//     });

//     //   if(index != -1) {
//     let productosEnCarrito = {};
//     let previa = null
//     contentArray.forEach((element) => {
//       if (element.id == id) {

//         productosEnCarrito = element.products;
//         let contentParse = JSON.parse(content);

//         previa = productosEnCarrito[contentParse.id -1];

//         console.log(previa);
//         previa = contentParse;

//         console.log(previa);

//         productosEnCarrito.push(previa)
//         console.log(productosEnCarrito);
//       }
//     });

//     // contentArray[index] = content
//     // console.log(contentArray[index] );
//     // this.saveInFile(contentArray)
//     // }
//     return contentArray;
//   }
