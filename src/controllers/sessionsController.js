const SessionsService = require("../services/sessionsService")

class SessionsController {
    constructor(){
        this.sessionService = new SessionsService 
    }

    async getRegister(req,res){
        // const result = await this.sessionService.get()
        // res.json(result) 
    }
    
    async postRegister(req,res){
        // const data = req.query
        // const result = await this.sessionService.postRegister(data)
        // res.json(result)
        return res.redirect("/login")
    }

    async postLogin(req,res){
        //const id = req.params.pid
        // const result = await this.sessionService.postLogin()
        // res.json(result)
        return res.redirect("/realTimeProducts")
    }

    async deleteRegister(req,res){
        //const body = req.body
        // const result = await this.sessionService.deleteRegister()
        // res.json(result)
        req.session.destroy((err) => {
            if (!err) {
              console.log("Se destruyo la sesion");
              res.json({ status: 200, data: "Se destruyo la sesion" });
            } else {
              res.send(err);
            }
          });
    }

    async resetPassword(req,res){
        // const id = req.params.pid
        // const body = req.body
        // const result = await this.sessionService.resetPassword(id,body)
        // res.json(result)
        const data = req.body;
        let response = await manager.getUser(data.email);
        if (response == null) {
          console.log(`El usuario ${data.email} no existe`);
          res.json({
            status: 400,
            data: `El usuario ${data.email} no existe`,
          });
          return;
        }
        let responseRecovery = await manager.recoveryPassword(data);
        console.log(responseRecovery);
        res.json(responseRecovery);
    }

}

module.exports = SessionsController;