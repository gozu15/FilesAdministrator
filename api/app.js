const express = require("express");
const app = express();
const routerMiddleware = express.Router();
const body_parser = require("body-parser");
const cors_config = require("cors");
const multi_party = require('connect-multiparty');
const http = require('http');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;
const config = require('./config/enviroment')
const mongoose = require('mongoose');
const server = http.createServer(app)
var nodecron = require("node-cron");
app.use(cors_config())
let io = require('socket.io')(server,
  {
    cors:{
      origin:"http://localhost:8080",
      methods: ["GET","POST"],
      credentials: true,
      allowEIO3: true
      },
      transport: ['websocket']
  }
  );  

let messages = [
  {
    author: "Carlos",
    text: "Hola! que tal?",
  },
  {
    author: "Pepe",
    text: "Muy bien! y tu??",
  },
  {
    author: "Paco",
    text: "Genial!",
  },
];
let check = null;
let cont= 0;
let date = new Date();
io.on('connection', socket => {
  console.log("Se conecto un cliente¡¡")
  let job = nodecron.schedule("*/4 * * * * *", () =>{
    console.log("My First Cron Job task run at: " + new Date()); 
    cont++;
    if(check != null){    
      console.log("NO ESTA VACIO",check);
      let id = check._id || check.id;
      let getTimefromClient = new Date(check.date_end).getTime()
      let timeNow = new Date().getTime()
      let rest =  getTimefromClient - timeNow
      let result_time = new Date(timeNow - rest)
      let check_date_to_notify= (result_time >= new Date(getTimefromClient)) ? true : false
      
      console.log("restDATE",result_time)
      console.log("check",check_date_to_notify)
      if(check_date_to_notify){
        console.log("TIMEOUT ",result_time);
        if(id == null){
          console.log("No existen datos")
        }
        else{
          socket.emit('timeout_notify',check)
        }
        
        check = null;
        cont = 0;
        job.stop()

      }
    }
    if(cont == 1){
      socket.emit('checkPingFromServer',{messages:"Hello client, i am server"});
    }
    // else{
    //   cont = (check.date_end - date);
    //   console.log("CONTADOR:",cont);
    // }
            
  });   
  socket.on('recieve_date',(data) =>{
    console.log(data); 
    check = data;           
  })     
  socket.on('disconnect', () => {
      console.log("DESCONECTADO")
  });

  
});

 function init(){
   mongoose.connect('mongodb://localhost/dbexample', {useNewUrlParser: true})
   .then(() =>{
   server.listen(PORT, () => {
   console.log(`Servidor escuchando en puerto ${PORT}`); 
    })   
     console.log("Conexion establecida en la Base de datos");
     
   })
   .catch(err =>{
     console.log("Ocurrio un error al conectarse a la Base de Datos", err);
   })
 }

let multiPartyMiddelwere = multi_party({
  uploadDir: './uploads'
});

// //MIDDLEWARES
app.set('llave',config.key)
// //BODY PARSER
app.use(
  body_parser.urlencoded({
    extended: true,
  })
);
app.use(body_parser.json());

// //CORS CONFIG
// app.use(cors_config());

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });


routerMiddleware.use((req,res,next)=>{
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, app.get('llave'), (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Token inválida' });    
      } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
    //next();
})

process.env.GOOGLE_APPLICATION_CREDENTIALS = config.GOOGLE_APLICATION_CREDENTIAL;

require("./routes/documents.route")(app, multiPartyMiddelwere,routerMiddleware);
require("./routes/auth.route")(app, jwt);
require("./routes/models_documents.route")(app,multiPartyMiddelwere,jwt);
require("./routes/diary_books.route")(app,multiPartyMiddelwere,jwt);
require("./routes/memorials_decrets.route")(app,multiPartyMiddelwere,jwt);
require("./routes/lawsandregulations.route")(app,multiPartyMiddelwere,jwt)
require("./routes/notifies_audience.route")(app,multiPartyMiddelwere,jwt)

module.exports = {  
  init  
};