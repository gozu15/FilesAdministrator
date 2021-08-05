'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Notify_Audience = new schema({
    name:{type:String, required:true, default:"No name"},
    description:{type:String, default:"No description"},
    date_end:{type:Date, required:true, default:new Date()},
    date_init:{type:Date, required:true, default:new Date()},
    lapso:{type:String,default:"15"},
    status:{
        type:String, 
        enum : ['EN PROCESO','LLEGANDO A TERMINO','TERMINADO'],
        default: 'EN PROCESO'
        },
    isdelete:{type:Boolean,required: true, default:false},
    created_at    : { type: Date,default:new Date()},
    updated_at    : { type: Date,default:new Date()}
})
Notify_Audience.pre('create', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});
module.exports = mongoose.model('Notifyaudience',Notify_Audience);