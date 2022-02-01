'use strict'
const mongoose = require('mongoose')
const schema =  mongoose.Schema;

const memorialesDecretosModel = new schema({
    name: {type:String, required:true, default:"Nuevo documento"},   
    type_document:{type:String, default: 'Memorial',require:true},
    description:{type:String,default:"No existe alguna descripcion"},
    documents_text:{type:String,default:"En espera", required:true},
    isdelete:{type:Boolean,required: true, default:false},
    created_at   : { type: Date, default: new Date() }, 
    updated_at   : { type: Date, default: new Date() }
})
memorialesDecretosModel.pre('update', function(next){
     let now = new Date();
     this.updated_at = now;        
     next();
});
module.exports = mongoose.model('Memodecre',memorialesDecretosModel);