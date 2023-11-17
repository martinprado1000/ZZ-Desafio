const express = require("express")
const ioFn = require("./io/io.js");
const cors = require("cors")
const { Command } = require ('commander')
const dotenv = require('dotenv')
const configEnvFn = require ("./config.env/configEnv")
const handlebars = require("express-handlebars");

const app = express();

//app.use("/static", express.static("public"));
app.use(express.static(__dirname+"/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

// Obtengo los argumentos, las variables de entorno y se lo paso al archivo config de mongo.
const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "dev"); // Por default ejecutamos en modo dev
program.parse(); // Finaliza la configuracion de argumentos
const options = program.opts(); // Obtengo los argumentos
dotenv.config({ // Le indico a dotenv el path donde se encuentra las variables de entorno
  path: `src/.env.${options.mode}` // path: inicia donde se hace el init de la app
});
console.log(`Sistema ejecutado en modo: ${options.mode}`);

const config = configEnvFn(); //Obtenemos las variables de entorno

const DbMongoSingleton = require('./connections/singleton')
const dbConnectionSingleton = DbMongoSingleton.getConnection(config)

app.use(express.json())
app.use(express(express.urlencoded({extended:true})))
app.use(cors())

// const PORT = 8080;
// app.listen(PORT,()=>{
//     console.log(`Server on port ${PORT}`);
// })

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor express corriendo en el puerto ${PORT}`)
); // Al server de express lo guardamos en una variable

const io = ioFn(httpServer);

const productRouterViews = require("./routers/productsRoutersViews")
const productsRouter = require("./routers/productsRouters")
const cartsRouter = require("./routers/cartsRouters")

app.use("/api",productsRouter)
app.use("/api",cartsRouter)
app.use("/",productRouterViews)

//Ruta incorrecta
app.use((req, res) => {
  res.status(404).send({ Error: "La ruta deseada no existe" });
});