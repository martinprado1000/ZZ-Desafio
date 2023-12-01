const ProductsService = require("../services/productsService")

class ProductsControllerViews {
    constructor(){
        this.productService = new ProductsService 
    }

    async get(req,res){
        const data = await this.productService.get()
        //res.render("realTimeProductsDb.handlebars", {data , userSession});
        res.render("realTimeProducts.handlebars", {data});
        }

    // async realTimeProductsAdmin(req,res){
    //     const userSession = req.user?.name;
    //     const query = req.query
    //     const result = await this.productService.getPaginateAdmin(query)
    //     const data = result.data
    //     //console.log(data)
    //     res.render("realTimeProductsAdmin.handlebars",{userSession, data, title:"Page products"});
    // }

    async realTimeProductsAdminPid(req,res){
        const userSession = req.user?.name;
        const query = req.query
        const pid = req.params.pid
        //console.log(pid)
        const result = await this.productService.getById(pid)
        const data = result.data
        console.log(data)
        res.render("realTimeProductsAdminPid.handlebars",{userSession, data, title:"Edit product"});
    }

    async realTimeProductsAdminAdd(req,res){
        const userSession = req.user?.name;
        console.log(userSession)
        res.render("realTimeProductsAdminAdd.handlebars",{userSession, title:"Add product"});
        // if (req.user?.rol == "admin") {
        //     res.render("realTimeProductsAdminAdd.handlebars",{userSession, title:"Add product"});
        //   } else {
        //     res.render("realTimeProductsAdminAdd.handlebars",{userSession, title:"Add product"});
        //   }
    }


    async realTimeProducts(req,res){
        const userSession = req.user?.name;
        const query = req.query
        const result = await this.productService.getPaginate(query)
        const data = result.data
        if (req.user?.rol == "admin") {
            res.render("realTimeProductsAdmin.handlebars",{data, userSession, title:"Products Admin"});
          } else {
            res.render("realTimeProducts.handlebars",{data, userSession, title:"Products"});
          }
    }

    async realTimeProductsPid(req,res){
        const userSession = req.user?.name;
        const query = req.query
        const pid = req.params.pid
        //console.log(pid)
        const result = await this.productService.getById(pid)
        const data = result.data
        console.log(data)
        res.render("realTimeProductsPid.handlebars",{data, userSession, title:"Page product id"});
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