const ProductsRepository = require("../repositories/productsRepository");

class ProductsService {
  constructor() {
    this.ProductsRepository = new ProductsRepository();
  }

  async get() {
    try {
      const result = await this.ProductsRepository.get();
      if (!result || result == "") {
        return { status: 404, data: "Productos no encontrados" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getPaginate(data) {
    try {
      console.log(data)
      // ?limit=2&page=2&query=fruta&sort=asc  // esto podemos recibir en la consulta
      const limit = parseInt(data.limit) || 10;
      const page = parseInt(data.page) || 1;
      const category = data.category || "";
      let sort = parseInt(data.sort) == "desc" ? -1 : 1 || "";
      sort = { price: sort };
      //const sort = parseInt(data.sort) || " ";
      const options = { limit, page, category, sort };
      //const products = await productModel.paginate(query,{ limit , page , sort:{price:sort} })
      //console.log(options)
      let query = {}; // Define un objeto vacío para la consulta
      if (category) {
        query.category = category; // Agrega la categoría a la consulta si se proporciona
      }
      const result = await this.ProductsRepository.getPaginate(query,options);
      if (!result || result == "") {
        return { status: 404, data: "Productos no encontrados" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getById(id) {
    try {
      if (!id) {
        return { status: 404, data: "Debe enviar un ID valido" };
      }
      const result = await this.ProductsRepository.getById(id);
      if (!result) {
        return { status: 404, data: "Producto no encontrado" };
      }
      //console.log(result)
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async post(body) {
    const { title,description,price,thumbnail,code,stock,category,} = body
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        return  { status: 404, data: "Campos incompletos" };
      }

      const products = await this.get()
      console.log(products)
      const productFound = products.findIndex((p)=>{p.code == code})
      console.log(productFound)

      const result = await this.ProductsRepository.post(body);
      //console.log(result)
      return { status: 201, data: "Producto ingresado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async put(id, body) {
    try {
      if (!id) {
        console.log("Debe enviar un ID valido");
        return { status: 400, data: "Debe enviar un ID valido" };
      }
      const result = await this.ProductsRepository.put(id, body);
      //console.log(result)
      if (!result) {
        return { status: 404, data: "Producto no encontrado" };
      }
      return { status: 201, data: "Producto editado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete(id) {
    try {
      if (!id) {
        console.log("Debe enviar un ID valido");
        return { status: 400, data: "Debe enviar un ID valido" };
      }
      const result = await this.ProductsRepository.delete(id);
      //console.log(result.deletedCount)
      if (result.deletedCount == 0) {
        return { status: 404, data: "Producto no encontrado" };
      }
      return { status: 201, data: "Producto eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }
}

module.exports = ProductsService;
