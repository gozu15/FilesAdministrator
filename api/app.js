const express = require("express");
const app = express();
const routerMiddleware = express.Router();
const body_parser = require("body-parser");
const cors_config = require("cors");
const multi_party = require('connect-multiparty');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;
let config = require('./config/enviroment')

const mongoose = require('mongoose');
const db = mongoose.connection;
//const routerMiddleware = express.Router(); 


function init(){
  mongoose.connect('mongodb://localhost/dbexample', {useNewUrlParser: true})
  .then(() =>{
    console.log("Conexion establecida en la Base de datos");
     app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  })
  })
  .catch(err =>{
    console.log("Ocurrio un error al conectarse a la Base de Datos", err);
  })
}


let multiPartyMiddelwere = multi_party({
  uploadDir: './uploads'
});


//MIDDLEWARES
app.set('llave',config.key)
//BODY PARSER
app.use(
  body_parser.urlencoded({
    extended: true,
  })
);
app.use(body_parser.json());

//CORS CONFIG
app.use(cors_config());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
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
}) 

process.env.GOOGLE_APPLICATION_CREDENTIALS = config.GOOGLE_APLICATION_CREDENTIAL;

require("./routes/documents.route")(app, multiPartyMiddelwere,routerMiddleware);
require("./routes/auth.route")(app, jwt);
require("./routes/models_documents.route")(app,multiPartyMiddelwere,jwt);
require("./routes/diary_books.route")(app,multiPartyMiddelwere,jwt);
require("./routes/memorials_decrets.route")(app,multiPartyMiddelwere,jwt);

module.exports = {  
  init  
};