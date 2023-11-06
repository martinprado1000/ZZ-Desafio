const productsModel = require("../models/productsModel");

class ProductsDAOMongo {
  constructor() {
    this.productsModel = productsModel;
  }

  async get() {
    try {
      return await this.productsModel.find();
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta get");
    }
  }

  async getPaginate(query,options) {
    try {
      return await this.productsModel.paginate(query,options);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta get");
    }
  }

  async getById(id) {
    try {
      return await this.productsModel.findById(id);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta getById");
    }
  }

  async getByCode(code) {
    try {
      return await this.productsModel.findOne({code:code});
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta getById");
    }
  }

  async post(body) {
    try {
      return await this.productsModel.create(body);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta post");
    }
  }

  async put(id, body) {
    try {
      return await this.productsModel.findByIdAndUpdate( id, { $set: body });
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta");
    }
  }

  async delete(id) {
    try {
      const result = await this.productsModel.deleteOne({ _id:id });
      return result
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta");
    }
  }

  async save(ob) {
    try {
      return await ob.save();
    } catch (e) {
      console.log(e)
      throw new Error("Error inesperado al salvar la consulta");
    }
  }
}

module.exports = ProductsDAOMongo;
