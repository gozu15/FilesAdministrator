const express = require("express");
const app = express();
const body_parser = require("body-parser");
const cors_config = require("cors");
const multi_party = require('connect-multiparty');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const db = mongoose.connection;

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

require("./routes/documents.route")(app, multiPartyMiddelwere);

module.exports = {  
  init
};