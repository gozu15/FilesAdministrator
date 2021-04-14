'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;
let day= new Date().getDate()
let month = new Date().getMonth()
let year = new Date().getFullYear()
let hr = new Date().getHours()
let text = ""+day+month+year+hr;
const Documentschema = new schema({
    name:{type:String, required:true, default:"documento"+text},
    data:{type:String, required:true},
     created_at    : { type: Date }, 
    updated_at    : { type: Date }

})
Documentschema.pre('create', function(next){
     now = new Date();
     this.updated_at = now;
     if ( !this.created_at ) {
       this.created_at = now;
     }
     next();
});
module.exports = mongoose.model('Documentsjudge',Documentschema)