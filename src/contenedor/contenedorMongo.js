// const { MONGO_URI } = require('../config/globals')
const mongoose = require("mongoose");
const moment = require("moment");

class ContenedorMongo {
  constructor(model) {
    const url = "mongodb://localhost:27017/ecommerceDB";
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("Connected")
    );

    this.model = model;
  }
  async saveInFile(content) {
    console.log(content);
    let carritoSave = new this.model(content);
    let carritoSaved = await carritoSave.save();
    console.log(carritoSaved);
  }
  async getContentFile() {
    return await this.model.find(
      {},
      {stock:1,
        id: 1,
        date: 1,
        products: 1,
        _id: 0,
        title: 1,
        price: 1,
        descripcion: 1,
        foto:1,
        
        update:1,
      }
    ).sort({id:1});
  }
  async getById(id) {
    let product = "No encontrado";
    let contentArray = await this.model.find(
      {},
      {
        id: 1,
        _id: 0,
        title: 1,
        price: 1,
        descripcion: 1,
        foto: 1,
        stock: 1,
        date: 1,
        update: 1,
        products: 1,
      }
    );
    // console.log(contentArray);
    contentArray.forEach((element) => {
      if (element.id == id) {
        product = element;
      }
    });
    return product;
  }
  async deleteById(id) {
    let productoEliminado = null;
    let contentArray = await this.model.find();
    // let newElementArray = null

    if (contentArray.length > 0) {
      contentArray.forEach((element) => {
        if (element.id == id) {
          let eliminar = element.delete();
          productoEliminado = element;
        }
      });
    }
    if (productoEliminado != null) {
      return productoEliminado;
    } else {
      return `El producto que quiere eliminar no existe`;
    }
  }
}

module.exports = ContenedorMongo;
