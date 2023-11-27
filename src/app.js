const express = require("express")
const ioFn = require("./io/io.js");
const cors = require("cors")
const { Command } = require ('commander')
const dotenv = require('dotenv')
const configEnvFn = require ("./config.env/configEnv")
const handlebars = require("express-handlebars");
const session = require("express-session");

const cookieParser = require("cookie-parser"); // Requerimos cookie-parse
const MongoStore = require("connect-mongo");
const passport = require("passport");
const initializePassport = require("./config.passport/passportConfig.js");
const flash = require("connect-flash");

const app = express();

//app.use("/static", express.static("public"));
app.use(express.static(__dirname+"/public"));
app.use(express.json())
app.use(express(express.urlencoded({extended:true})))
app.use(cors())

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
const CONNECTION_MONGO = DbMongoSingleton.urlConnection() // Obtengo la url de conexion

// Middleware de sessionon
app.use(cookieParser("estaEsMiLlaveSecreta"));
//Middleware de session
app.use(
  session({
    store: MongoStore.create({
      // MongoStore.create, crea una session en la db de mongo
      mongoUrl: CONNECTION_MONGO, // Le indicamos que db crear la session
      ttl: 1200,      // time to live; tiempo de vida, esta en SEGUNDOS.
      //retrien: 0    // Cantidad de reintentos que hace para leer el archivo de ssesion
    }),
    secret: "estaEsMiLlaveSecreta",
    resave: true, // Si esta opcion la ponemos en false es para que la sesion se mantenga activa en caso de inactividad.
    saveUninitialized: true, // Permite guardar la sesion aunque el objeto de session no tenga nada.
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor express corriendo en el puerto ${PORT}`)
); // Al server de express lo guardamos en una variable

const io = ioFn(httpServer);

const productsRouterViews = require("./routers/productsRoutersViews")
const productsRouter = require("./routers/productsRouters")
const cartsRouter = require("./routers/cartsRouters")
const sessionsRouterViews = require("./routers/sessionsRoutesView.js")
const sessionsRouter = require("./routers/sessionsRoutes.js")

app.use("/api",productsRouter)
app.use("/api",cartsRouter)
app.use("/api",sessionsRouter)
app.use("/",productsRouterViews)
app.use("/",sessionsRouterViews)

//Ruta incorrecta
app.use((req, res) => {
  res.status(404).send({ Error: "La ruta deseada no existe" });
});