const ProductsService = require("../services/productsService")

class ProductsControllerViews {
    constructor(){
        this.productService = new ProductsService 
    }

    async get(req,res){
        const data = await this.productService.get()
        console.log(data)
        //res.render("realTimeProductsDb.handlebars", {data , userSession});
        res.render("realTimeProducts.handlebars", {data});
        }
    // const realTimeProducts = async (req, res) => { 
    //     try {
    //       const userSession = req.user.name;// Recordar que con passport la session se guarda en req.user
    //       const query = req.query;
    //       const response = await productsService.getProductsPaginate(query); 
    //       const data = response.data  
    //       res.render("realTimeProductsDb.handlebars", {data , userSession});
    //     } catch (e) {
    //       console.log(e);
    //       return { Error: "Algo salio mal con la consulta" };
    //     }
    //   };
    
    async getPaginate(req,res){
        const query = req.query
        const result = await this.productService.getPaginate(query)
        const data = result.data
        //console.log(data)
        res.render("realTimeProducts.handlebars",{data,title:"Page products"});
    }

    async getPaginateAdmin(req,res){
        const query = req.query
        const result = await this.productService.getPaginate(query)
        const data = result.data
        //console.log(data)
        res.render("realTimeProductsAdmin.handlebars",{data,title:"Page products"});
    }

    async editProduct(req,res){
        const query = req.query
        const result = await this.productService.getPaginate(query)
        const data = result.data
        //console.log(data)
        res.render("editProduct.handlebars",{data,title:"Edit products"});
    }

    async getById(req,res){
        const id = req.params.pid
        const result = await this.productServiceViews.getById(id)
        res.json(result)
    }

    async post(req,res){
        const body = req.body
        const result = await this.productServiceViews.post(body)
        res.json(result)
    }

    async put(req,res){
        const id = req.params.pid
        const body = req.body
        const result = await this.productServiceViews.put(id,body)
        res.json(result)
    }

    async delete(req,res){
        const id = req.params.pid
        const result = await this.productServiceViews.delete(id)
        res.json(result)
    }

}

module.exports = ProductsControllerViews;