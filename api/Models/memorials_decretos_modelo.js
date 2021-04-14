'use strict'
const mongoose = require('mongoose')
const schema =  mongoose.Schema;

const memorialesDecretosModel = new schema({
    name: {type:String, required:true, default:"No name"},
    victim: {type : String, required:true},
    acussed: {type: String, required:true},
    nurek_code:{type:String, required:true},
    number_cause:{type:String, required:true},
    description:{type:String, required:true},
     created_at   : { type: Date, default: new Date(),required:true }, 
    updated_at    : { type: Date, default: new Date() ,required:true}
})
memorialesDecretosModel.pre('update', function(next){
     now = new Date();
     this.updated_at = now;    
     console.log("ENTRO PRE");
     next();
});
module.exports = mongoose.model('Memodecre',memorialesDecretosModel);