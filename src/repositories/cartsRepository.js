// Repository: requerimos el factory para seleccionar el tipo de persistencia

const cartsFactory = require("../factories/cartsFactory");
const CartsDTO = require("../DTOs/cartsDTO");

class CartsRepository {
  constructor() {
    this.dao = cartsFactory(process.env.PERSISTENCE);
    console.log(this.dao);
  }

  async get() {
    const result = await this.dao.get();
    if (result == null) {
      return result;
    }
    return result.map((cart) => new CartsDTO(cart));
    //return result
  }

  async getById(id) {
    const result = await this.dao.getById(id);
    if (result == null) {
      return result;
    }
    return new CartsDTO(result);
    //return result
  }

  async post(body) {
    const result = await this.dao.post(body);
    if (result == null) {
      return result;
    }
    //return new CartsDTO(result);
    return result
  }

  async put(id, body) {
    const result = await this.dao.put(id, body);
    if (result == null) {
      return result;
    }
    //return new CartsDTO(result);
    return result
  }

  async delete(id) {
    const result = await this.dao.delete(id);
    return result;
  }
}

module.exports = CartsRepository;
