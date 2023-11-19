const SessionsService = require("../services/sessionsService")

class SessionsController {
    constructor(){
        this.sessionService = new SessionsService 
    }

    async get(req,res){
        const result = await this.sessionService.get()
        res.json(result)
    }
    
    async postRegister(req,res){
        const data = req.query
        const result = await this.sessionService.getPaginate(data)
        res.json(result)
    }

    async postLogin(req,res){
        const id = req.params.pid
        const result = await this.sessionService.getById(id)
        res.json(result)
    }

    async deleteRegister(req,res){
        const body = req.body
        const result = await this.sessionService.post(body)
        res.json(result)
    }

    async resetPassword(req,res){
        const id = req.params.pid
        const body = req.body
        const result = await this.sessionService.put(id,body)
        res.json(result)
    }

}

module.exports = SessionsController;