const mongoose = require ('mongoose');
const schema = mongoose.Schema;
let ImageObjectModel =  new schema({    
    url_uploaded:{type:String, required:true, default:"En espera"},    //DIRECCION DE IMAGEN RESPECTIVO
    type_image:{type:String, required:true, default:"En espera"},
    code_document:{type:String, required:true, default:"En espera"},   //CODIGO UNICO    
    date_admission:{type:String, required:true, default:"En espera"},  //FECHA DE RECEPCION
    hours_admission:{type:String, required:true, default:"En espera"}, //HORA DE RECEPCION    
    relevant_court:{type:String, required:true, default:"En espera"},  //JUZGADO ASIGNADO
    crime:{type:String, required:true, default:"En espera"},           //CRIMEN
    process_type:{type:String, required:true, default:"En espera"},    //TIPO DE PROCESO
    appellant:[],    //QUERELLANTES
    accused:[],       //IMPUTADOS
    victim:[],        //VICTIMAS
    court_code:{type:String,required:false, default:"En espera"},      //CODIGO DE JUZGADO ASIGNADO
    isdelete:{type:Boolean,required: true, default:false},
    created_at    : { type: Date,default:new Date()  },
    updated_at    : { type: Date,default:new Date()  }
})
ImageObjectModel.pre('create', function(next){
     now = new Date();
     this.updated_at = now;
     if ( !this.created_at ) {
       this.created_at = now;
     }
     next();
});
module.exports = mongoose.model('Imagesobject', ImageObjectModel);