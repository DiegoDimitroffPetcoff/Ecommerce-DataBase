const fs = require("fs");
const moment = require("moment");

class ContenedorArchivo {
  constructor(fileName) {
    this.fileName = fileName;
  }

  saveInFile(content) {
    fs.writeFileSync(this.fileName, JSON.stringify(content, null, "\t"));
  }

  getContentFile() {
    let content = [];

    try {
      let file = fs.readFileSync(this.fileName, "utf-8");
      content = JSON.parse(file);
    } catch (error) {
      this.saveInFile(content);
      console.log(`Creacion del archivo ${this.fileName}`);
    }

    return content;
  }

  getById(x) {
    let y = x;
    let array = this.getContentFile();
    let object = null;
    array.forEach((element) => {
      if (element.id == y) {
        object = element;
      }
    });
    return object;
  }

  deleteById(id) {
    let contentArray = this.getContentFile();
    if (contentArray.length > 0) {
      let newElementArray = contentArray.filter((elem) => elem.id != id);
      this.saveInFile(newElementArray);
    }
    return { Resultado: `Producto Numero ${id} eliminado correctamente` };
  }
}

module.exports = { ContenedorArchivo };
