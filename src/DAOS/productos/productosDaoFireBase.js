const { ContainerFireBase } = require('../../contenedor/contenedorFireBase')

class ProductoDaoFireBase extends ContainerFireBase {
  constructor(){
    super('productos')
  }

}

module.exports = { ProductoDaoFireBase }