'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema

const Modelodocumento= new schema({
    name:{type:String, required:true},
    text:{type:String, required: true},
    type_model:{type:String,enum : ['Decret','Memorial'], default: 'Memorial',require:true},
    created_at    : { type: Date, default:new Date() }, 
    updated_at    : { type: Date,default:new Date()  }
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