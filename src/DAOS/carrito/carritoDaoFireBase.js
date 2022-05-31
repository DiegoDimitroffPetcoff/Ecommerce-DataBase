const { ContainerFireBase } = require('../../contenedor/contenedorFireBase')

class CarritoDaoFireBase extends ContainerFireBase {
  constructor(){
    super('carritos')
  }

}

module.exports = { CarritoDaoFireBase }