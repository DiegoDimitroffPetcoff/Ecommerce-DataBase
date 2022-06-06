let admin = require("firebase-admin");
const moment = require("moment");
// let { FIRESTORE_FILE } = require('../config/globals')
// const FIRESTORE_PATH_FILE = require(FIRESTORE_FILE)
const serviceAccount = require("../data/db/ecommerce-b3bd7-firebase-adminsdk-2hdz8-386597cd74.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

class ContainerFireBase {
  constructor(collection) {
    this.collection = db.collection(collection);
    console.log(`Base conectada con la collection ${collection}`);
  }

  async addProduct(document) {
    let result = await this.collection.get();
    result = result.docs.map((doc) => ({
      id: doc.id,
    }));
    let setId = null;
    result.forEach((element) => {
      setId = element.id;
    });
    let id = setId++;
    id++;
    let date = moment().format("DD-MM-YYYY HH:mm:ss");
    document.date = date;
    let doc = this.collection.doc(`${id}`);
    let item = await doc.create(document);

    return `Se acaba de agregar un producto nuevo con el ID Numero: ${id}`;
  }

  async getContentFile() {
    let result = await this.collection.get();
    result = result.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return result;
  }

  async getById(id) {
    let result = await this.collection.get();
    result = result.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    let item = result.find((elem) => elem.id == id);
    return item;
  }

  async saveCarrito(document) {
    try {
      this.addProduct(document);
    } catch (error) {
      console.log(`No se pudo guardar: ${error}`);
      return `No se pudo guardar: ${error}`;
    }
  }

  async deleteById(id) {
    let doc = this.collection.doc(`${id}`);
    console.log(doc);
    let item = doc.delete();
    return `Acaba de eliminar el producto ID numero: ${id}`;
  }

  async edit(content, id) {
    let doc = this.collection.doc(`${id}`);
    console.log(doc);
    let date = moment().format("DD-MM-YYYY HH:mm:ss");
    content.Update = date;
    let item = await doc.update(content);
    return item;
  }

  async update(products, id) {
    let pro = products;
    console.log(pro.title);
    const res = await this.collection
      .doc(`${id}`)
      .set(products, { merge: false });
// solo se pudo lograr que se agregue un producto a cada carrito, si se agrega uno diferente este es reemplazado pero no agregado
    return `Acaba de agregar el producto ID: ${products} en el carrito ID num: ${id}`;
  }
}

module.exports = { ContainerFireBase };
