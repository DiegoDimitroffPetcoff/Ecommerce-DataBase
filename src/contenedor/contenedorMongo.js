// const { MONGO_URI } = require('../config/globals')
const mongoose = require("mongoose");

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

  async getAll() {
    return await this.model.find();
  }
  async getById(id) {
    let element = null;
    let contentArray = await this.model.find();
    let content = null;
    if (contentArray.length > 0) {
      element = contentArray.find((elem) => elem.id == id);
    }
    if (element) {
      content = element;
    }
    return element;
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
    return productoEliminado;
  }
}

module.exports = ContenedorMongo;
