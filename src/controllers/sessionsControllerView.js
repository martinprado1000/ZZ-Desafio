const SessionsService = require("../services/sessionsService")

class SessionsController {
    constructor(){
        this.sessionService = new SessionsService 
    }

    async register(req,res){
        const result = await this.sessionService.get()
        res.json(result)
    }
    
    async login(req,res){
        const data = req.query
        const result = await this.sessionService.getPaginate(data)
        res.json(result)
    }

    async recoveryPassword(req,res){
        const id = req.params.pid
        const result = await this.sessionService.getById(id)
        res.json(result)
    }

}
module.exports = SessionsController;