const { Router } = require("express");

const SessionsControllerView = require("../controllers/sessionsControllerView")

const sessionRouterView = new Router()

const sessionsControllerView = new SessionsControllerView();

const sessionMiddleware = (req, res, next) => {  // Creo el middleware para usar en las siguientes 2 rutas
  if (req.user) {  // recordar que passport deja la session en req.user
    res.redirect("/realTimeProducts");
  }
  return next();
};

sessionRouterView.get("/register", sessionMiddleware, sessionsControllerView.register.bind(sessionsControllerView)); // // Aca le agregue el middleware para que si ya a iniciado session no pueda ir a la paginoa de register

sessionRouterView.get("/login", sessionMiddleware, sessionsControllerView.login.bind(sessionsControllerView)); // Aca le agregue el middleware para que si ya a iniciado session no pueda ir a la paginoa de login

sessionRouterView.get("/recovery-password", sessionsControllerView.recoveryPassword.bind(sessionsControllerView));

module.exports = sessionRouterView
