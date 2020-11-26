'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

let UserModel = new schema ({
    name:{type:String, required:true},
    last_name:{type: String, required:true},
    gender:{type: String, required:true},
    authorization:[],
    email:{type:String, required:true},
    user_name:{type:String, required:true},
    password:{type:String, required:true},
    created_at    : { type: Date }, 
    updated_at    : { type: Date }

})
UserModel.pre('create', function(next){
     now = new Date();
     this.updated_at = now;
     if ( !this.created_at ) {
       this.created_at = now;
     }
     next();
});
module.exports = mongoose.model('User',UserModel)