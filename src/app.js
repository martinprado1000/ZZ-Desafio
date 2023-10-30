const express = require("express")
const productsRouter = require("./routers/productsRouters")
const cartsRouter = require("./routers/cartsRouters")
const cors = require("cors")
const { Command } = require ('commander')
const dotenv = require('dotenv')
const configEnvFn = require ("./config.env/configEnv")

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

const app = express();

app.use(express.json())
app.use(express(express.urlencoded({extended:true})))
app.use(cors())

app.use("/api",productsRouter)
app.use("/api",cartsRouter)

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`);
})