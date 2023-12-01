const SessionsService = require("../services/sessionsService")

class SessionsController {
    constructor(){
        this.sessionService = new SessionsService
    }

    async register(req,res){
        const error = req.flash('error')[0] // Recordar que flash solo se muestra la primera vez, si hago un clg anteriar luevo el req.flash ya no existe.
        //console.log(error)
        return res.render('register',{error,hasError:error!==undefined})
    }
    
    async login(req,res){
        const error = req.flash('error')[0];
        //console.log(error)
        return res.render('login',{error,hasError:error!==undefined})
    }

    async recoveryPassword(req,res){
        res.render("recoveryPassword.handlebars");
    }

}
module.exports = SessionsController;