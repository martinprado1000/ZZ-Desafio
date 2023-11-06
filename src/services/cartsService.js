const CartsRepository = require("../repositories/cartsRepository");
const ProductsRepository = require("../repositories/productsRepository");
const mongoose = require("mongoose");

// Funcion para validar si los ip son validos para mongo
const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

class CartsService {
  constructor() {
    this.CartsRepository = new CartsRepository();
    this.ProductsRepository = new ProductsRepository();
  }

  // Edicion de carritos ------------------------------------------------------
  async get(limit) {
    try {
      const result = await this.CartsRepository.get(limit);
      if (!result || result == "") {
        return { status: 201, data: "No hay carritos cargados en el sistema" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getById(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID del carrito invalido" };
    }
    try {
      const result = await this.CartsRepository.getById(id);
      if (!result) {
        return { status: 404, data: "Carrito inexistente" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async post(body) {
    try {
      const cartFound = await this.CartsRepository.getByEmail(body.email);
      if (cartFound != null) {
        return { status: 404, data: "El email ya existe" };
      }
      const result = await this.CartsRepository.post(body);
      //console.log(result)
      return { status: 201, data: "Carrito creado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async put(id, body) {
    if (!isValid(id)) {
      return { status: 404, data: "ID del carrito invalido" };
    }
    try {
      const cartFound = await this.CartsRepository.getByEmail(body.email);
      if (cartFound != null) {
        return { status: 404, data: "El email ya existe" };
      }
      const result = await this.CartsRepository.put(id, body);
      //console.log(result)
      if (!result) {
        return { status: 404, data: "Carrito inexistente" };
      }
      return { status: 201, data: "Carrito editado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID del carrito invalido" };
    }
    try {
      const result = await this.CartsRepository.delete(id);
      //console.log(result.deletedCount)
      if (result.deletedCount == 0) {
        return { status: 404, data: "Carrito inexistente" };
      }
      return { status: 201, data: "Carrito eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  // Edicion de productos en un carrito ----------------------------------------
  async getProductFromCart({ cid, pid }) {
    if (!isValid(cid) || !isValid(pid)) {
      return { status: 404, data: "ID invalido" };
    }
    try {
      const cartFound = await this.CartsRepository.getById(cid);
      if (!cartFound) {
        return {
          status: 404,
          data: "Carrito inexistente",
        };
      }
      const productFound = cartFound.products.find((p) => p.product == pid);
      if (!productFound) {
        return { status: 404, data: "Producto no encontrado en el carrito" };
      }
      return { status: 200, data: productFound };
    } catch (e) {
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async postProductFromCart({ cid, pid, body }) {
    // Valido id de mongo
    if (!isValid(cid) || !isValid(pid)) {
      return { status: 404, data: "ID invalido" };
    }
    if (body.quantity <= 0) {
      return { status: 404, data: "Cantidad de producto incorrecta" };
    }
    try {
      let cartFound = await this.CartsRepository.getById(cid);
      // Valido si existe el carrito
      if (!cartFound) {
        return {
          status: 404,
          data: "Carrito inexistente",
        };
      }
      const productFound = await this.ProductsRepository.getById(pid);
      // Valido si existe el producto
      if (!productFound) {
        return {
          status: 404,
          data: "Producto inexistente",
        };
      }
      // Valido stock disponible
      if (productFound.stock < body.quantity) {
        return {
          status: 404,
          data: "Stock insuficiente",
        };
      }
      let productFoundInCart = cartFound.products.find(
        (p) => p.product._id == pid
      );
      // Valido si existe el producto en el carrito
      if (!productFoundInCart) {
        cartFound.products.push(body);
        await this.CartsRepository.save(cartFound);
        // Actualizo el stock
        const updatedStock = productFound.stock - body.quantity;
        this.ProductsRepository.put(pid, { stock: updatedStock });
        return {
          status: 201,
          data: "el producto no existe en el carrito. Porducto agregado",
        };
      }
      productFoundInCart.quantity = productFoundInCart.quantity + body.quantity;
      await this.CartsRepository.save(cartFound);
      // Actualizo el stock
      const updatedStock = productFound.stock - body.quantity;
      this.ProductsRepository.put(pid, { stock: updatedStock });
      return {
        status: 201,
        data: `El producto existe en el carrito, se le suma la cantidad de ${body.quantity}`,
      };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async putProductFromCart({ cid, pid, body }) {
    // Valido id de mongo
    if (!isValid(cid) || !isValid(pid)) {
      return { status: 404, data: "ID invalido" };
    }
    // Valido mayor que 0
    if (body.quantity <= 0) {
      return { status: 404, data: "Cantidad de producto incorrecta" };
    }
    try {
      let cartFound = await this.CartsRepository.getById(cid);
      // Valido si existe el carrito
      if (!cartFound) {
        return {
          status: 404,
          data: "Carrito inexistente",
        };
      }
      const productFound = await this.ProductsRepository.getById(pid);
      // Valido si existe el producto
      if (!productFound) {
        return {
          status: 404,
          data: "Producto inexistente",
        };
      }
      let productFoundInCart = cartFound.products.find(
        (p) => p.product._id == pid
      );
      // Valido si existe el producto en el carrito
      if (!productFoundInCart) {
        return {
          status: 404,
          data: "El producto no existe en el carrito",
        };
      }
      // Valido stock disponible
      if (productFound.stock < body.quantity) {
        return {
          status: 404,
          data: "Stock insuficiente",
        };
      }
      productFoundInCart.quantity = body.quantity;
      await this.CartsRepository.save(cartFound);
      // Actualizo el stock de los productos
      const updatedQuantity = productFoundInCart.quantity - body.quantity;
      const updatedStock = productFound.stock + updatedQuantity;
      console.log(updatedQuantity);
      console.log(updatedStock);
      this.ProductsRepository.put(pid, { stock: updatedStock });
      return {
        status: 201,
        data: `Cantidad del producto editada correctamente`,
      };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async deleteProductFromCart({ cid, pid }) {
    if (!isValid(cid) || !isValid(pid)) {
      return { status: 404, data: "ID invalido" };
    }
    try {
      let cartFound = await this.CartsRepository.getById(cid);
      console.log(cartFound)
      if (!cartFound) {
        return {
          status: 404,
          data: "Carrito inexistente",
        };
      }
      const productFound = await this.ProductsRepository.getById(pid);
      if (!productFound) {
        return {
          status: 404,
          data: "Producto inexistente",
        };
      }
      const productFoundInCart = cartFound.products.find((p) => p.product == pid);
      console.log(productFoundInCart)
      if (!productFoundInCart) {
        return {
          status: 404,
          data: "El producto no existe en el carrito",
        };
      }

      // Actualizo el stock de los productos
      const updatedStock = productFound.stock + productFoundInCart.quantity;
      //console.log(updatedStock);
      this.ProductsRepository.put(pid, { stock: updatedStock });

      cartFound.products = cartFound.products.filter((p) => p.product != pid);
      console.log(cartFound)
      await this.CartsRepository.save(cartFound);

      return {
        status: 204,
        data: "El producto se elimino del carrito",
      };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }
}

module.exports = CartsService;
