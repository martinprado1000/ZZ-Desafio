const CartsRepository = require("../repositories/cartsRepository");
const ProductsRepository = require("../repositories/productsRepository");

class CartsService {
  constructor() {
    this.CartsRepository = new CartsRepository();
    this.ProductsRepository = new ProductsRepository();
  }

  // Edicion de carritos ----------------------------------------
  async get() {
    try {
      const result = await this.CartsRepository.get();
      if (!result || result=="") {
        return { status: 201, data: "No hay carritos cargados en el sistema" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getById(id) {
    try {
      const result = await this.CartsRepository.getById(id);
      if (!result) {
        return { status: 404, data: "Carrito no encontrado" };
      }
      //console.log(result)
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async post(body) {
    try {
      const result = await this.CartsRepository.post(body);
      //console.log(result)
      return { status: 201, data: "Carrito ingresado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async put(id, body) {
    try {
      const result = await this.CartsRepository.put(id, body);
      //console.log(result)
      if (!result) {
        return { status: 404, data: "Carrito no encontrado" };
      }
      return { status: 201, data: "Carrito editado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete(id) {
    try {
      const result = await this.CartsRepository.delete(id);
      //console.log(result.deletedCount)
      if (result.deletedCount == 0) {
        return { status: 404, data: "Carrito no encontrado" };
      }
      return { status: 201, data: "Carrito eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

    // Edicion de productos en un carrito ----------------------------------------
    async getProductFromCart({cid,pid}) {
      try {
        const result = await this.ProductsRepository.getProductInCart(body);
        //console.log(result)
        return { status: 201, data: "Producto ingresado correctamente" };
      } catch (e) {
        console.log(e);
        return { status: 500, data: "Error inesperado en el sistema" };
      }
    }

    async postProductFromCart({cid,pid,body}) {
      console.log({cid,pid,body})
      try {
        const result = await this.ProductsRepository.postProductInCart(body);
        //console.log(result)
        return { status: 201, data: "Producto ingresado correctamente" };
      } catch (e) {
        console.log(e);
        return { status: 500, data: "Error inesperado en el sistema" };
      }
    }
  
    async putProductFromCart({cid,pid,body}) {
      try {
        const result = await this.ProductsRepository.putProductInCart(body);
        //console.log(result)
        return { status: 201, data: "Producto ingresado correctamente" };
      } catch (e) {
        console.log(e);
        return { status: 500, data: "Error inesperado en el sistema" };
      }
    }
  
    async deleteProductFromCart({cid,pid}) {
      try {
        const result = await this.ProductsRepository.deleteProductInCart(body);
        //console.log(result)
        return { status: 201, data: "Producto ingresado correctamente" };
      } catch (e) {
        console.log(e);
        return { status: 500, data: "Error inesperado en el sistema" };
      }
    }

}

module.exports = CartsService;
