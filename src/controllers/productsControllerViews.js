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

    async realTimeProductsAdmin(req,res){
        const query = req.query
        const result = await this.productService.getPaginateAdmin(query)
        const data = result.data
        //console.log(data)
        res.render("realTimeProductsAdmin.handlebars",{data,title:"Page products"});
    }

    async realTimeProductsAdminPid(req,res){
        const query = req.query
        const pid = req.params.pid
        //console.log(pid)
        const result = await this.productService.getById(pid)
        const data = result.data
        console.log(data)
        res.render("realTimeProductsAdminPid.handlebars",{data,title:"Edit product"});
    }

    async realTimeProductsAdminAdd(req,res){
        res.render("realTimeProductsAdminAdd.handlebars",{title:"Add product"});
    }


    async realTimeProducts(req,res){
        const query = req.query
        const result = await this.productService.getPaginate(query)
        const data = result.data
        //console.log(data)
        res.render("realTimeProducts.handlebars",{data,title:"Page products"});
    }

    async realTimeProductsPid(req,res){
        const query = req.query
        const pid = req.params.pid
        //console.log(pid)
        const result = await this.productService.getById(pid)
        const data = result.data
        console.log(data)
        res.render("realTimeProductsPid.handlebars",{data,title:"Page product id"});
    }



    // async getById(req,res){
    //     const id = req.params.pid
    //     const result = await this.productService.getById(id)
    //     res.json(result)
    // }

    // async post(req,res){
    //     const body = req.body
    //     const result = await this.productService.post(body)
    //     res.json(result)
    // }

    // async put(req,res){
    //     const id = req.params.pid
    //     const body = req.body
    //     const result = await this.productService.put(id,body)
    //     res.json(result)
    // }

    // async delete(req,res){
    //     const id = req.params.pid
    //     const result = await this.productService.delete(id)
    //     res.json(result)
    // }

}

module.exports = ProductsControllerViews;