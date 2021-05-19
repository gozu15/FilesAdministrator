'use strict'
const mongoose = require('mongoose')
const schema =  mongoose.Schema;

const memorialesDecretosModel = new schema({
    name: {type:String, required:true, default:"No name"},
   uid_image_object:{
    type:schema.Types.ObjectId,
    ref:'Imagesobject'
},
    type_document:{type:String,enum : ['Decret','Memorial','ModelDecret','ModelMemorial'], default: 'Memorial',require:true},
    description:{type:String,default:"No existe alguna descripcion", required:true},
    documents_text:{type:String,default:"En espera", required:true},
    created_at   : { type: Date, default: new Date(),required:true }, 
    updated_at   : { type: Date, default: new Date() ,required:true}
})
memorialesDecretosModel.pre('update', function(next){
     let now = new Date();
     this.updated_at = now;    
     console.log("ENTRO PRE");
     next();
});
module.exports = mongoose.model('Memodecre',memorialesDecretosModel);