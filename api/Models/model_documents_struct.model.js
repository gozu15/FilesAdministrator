'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema

const Modelodocumento= new schema({
  name: {type:String, required:true, default:"Nuevo documento"},
  uid_image_object:
   {
   type:schema.Types.ObjectId,
   ref:'Imagesobject',   
   },
   type_document:{type:String, default: 'Memorial',require:true},
   description:{type:String,default:"No existe alguna descripcion", required:true},
   documents_text:{type:String,default:"En espera", required:true},
   isdelete:{type:Boolean,required: true, default:false},
   created_at   : { type: Date, default: new Date(),required:true }, 
   updated_at   : { type: Date, default: new Date() ,required:true}
})
Modelodocumento.pre('update', function(next){
     let now = new Date();
     this.updated_at = now;
     if ( !this.created_at ) {
       this.created_at = now;
     }
     next();
});

module.exports= mongoose.model('modeldoc',Modelodocumento);