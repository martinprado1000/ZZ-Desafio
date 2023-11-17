const {Router} = require("express")

const ProductsControllerViews = require("../controllers/productsControllerViews")

const productRouterViews = new Router()

const productsControllerViews = new ProductsControllerViews();

productRouterViews.get("/realTimeProducts",productsControllerViews.getPaginate.bind(productsControllerViews))
productRouterViews.get("/realTimeProductsAdmin",productsControllerViews.getPaginateAdmin.bind(productsControllerViews))
productRouterViews.get("/editProduct",productsControllerViews.editProduct.bind(productsControllerViews))
productRouterViews.get("/realTimeProducts/:pid",productsControllerViews.getById.bind(productsControllerViews))
productRouterViews.post("/realTimeProducts",productsControllerViews.post.bind(productsControllerViews))
productRouterViews.put("/realTimeProducts/:pid",productsControllerViews.put.bind(productsControllerViews))
productRouterViews.delete("/realTimeProducts/:pid",productsControllerViews.delete.bind(productsControllerViews))

module.exports = productRouterViews

