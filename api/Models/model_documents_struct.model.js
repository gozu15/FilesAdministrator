'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema

const Modelodocumento= new schema({
    nombre:{type:String, required:true},
    texto:{type:String, required: true},
    created_at    : { type: Date }, 
    updated_at    : { type: Date }
})
Modelodocumento.pre('create', function(next){
     now = new Date();
     this.updated_at = now;
     if ( !this.created_at ) {
       this.created_at = now;
     }
     next();
});

module.exports= mongoose.model('modeldoc',Modelodocumento);