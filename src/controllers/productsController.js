const ProductsService = require("../services/productsService")

class ProductsController {
    constructor(){
        this.productService = new ProductsService 
    }

    async get(req,res){
        const result = await this.productService.get()
        res.json(result)
    }
    
    async getPaginate(req,res){
        const data = req.query
        const result = await this.productService.getPaginate(data)
        res.json(result)
    }

    async getById(req,res){
        const id = req.params.pid
        const result = await this.productService.getById(id)
        res.json(result)
    }

    async post(req,res){
        const body = req.body
        const result = await this.productService.post(body)
        res.json(result)
    }

    async put(req,res){
        const id = req.params.pid
        const body = req.body
        const result = await this.productService.put(id,body)
        res.json(result)
    }

    async delete(req,res){
        const id = req.params.pid
        const result = await this.productService.delete(id)
        res.json(result)
    }

}

module.exports = ProductsController;