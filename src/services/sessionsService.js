const SessionsRepository = require("../repositories/sessionsRepository");
const mongoose = require("mongoose");

// Funcion para validar si los ip son validos para mongo
const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

class SessionsService {
  constructor() {
    this.SessionsRepository = new SessionsRepository();
  }

  async get() {
    try {




    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async postRegister(data) {
    try {
  


    } catch (e) {
      console.log(e);
      return { status: 500, result: "Error inesperado en el sistema" };
    }
  }

  async postLogin(data) {
    try {

      
    } catch (e) {
      console.log(e);
      return { status: 500, result: "Error inesperado en el sistema" };
    }
  }

  async deleteRegister(id) {
    try {



    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async resetPassword(code) {
    try {

      
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

}

module.exports = SessionsService;
