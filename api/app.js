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

let check = null;
io.on('connection', (socket) => {  
  console.log("Se conecto un cliente¡¡")
  let job = nodecron.schedule("*/4 * * * * *", () =>{
    console.log("My First Cron Job task run at: " + new Date());     
    console.log("DATA",check)
     if(check != null){    
      let id = (check._id != undefined ? check._id : check.id);
      let getTimefromClient = new Date(check.date_end).getTime()
      let timeNow = new Date().getTime()    
      let check_date_to_notify= (timeNow >= getTimefromClient) ? true : false  
      console.log(check_date_to_notify);    
      if(check_date_to_notify){      
        if(id != null){
          io.emit('timeout_notify',check)
          console.log("DATO ENVIADO AL CLIENT",check)   
        }       
      }  
    }
     else{
       socket.emit('checkPingFromServer',{messages:"Hello client, i am server"});
     }  
  });   
  socket.on('recieve_date',(data) =>{    
    check = data;          
  })     
  socket.on('disconnect-from-server', () => {
      socket.emit('disconnected',"DESCONECTANDO")
  });
  socket.on('disconnect',() =>{
    console.log("SE DESCONECTO UN USUARIO")
  })
  socket.on('created-notify', () =>{
    let check = {
      status:true
    };
    socket.broadcast.emit('postcreate_notify',check);
  })
  socket.on('closing_notification',()=>{
    check = null
    socket.broadcast.emit('finished_notification',check);
  })
  
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
app.use(cors_config());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//AUTENTIFICACION POR TOKEN
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
require("./routes/diary_books.route")(app,multiPartyMiddelwere,jwt);
require("./routes/memorials_decrets.route")(app,multiPartyMiddelwere,jwt);
require("./routes/lawsandregulations.route")(app,multiPartyMiddelwere,jwt)
require("./routes/notifies_audience.route")(app,multiPartyMiddelwere,jwt)

module.exports = {  
  init  
};