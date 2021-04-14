'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const descriptionDataDiarybook = new schema({
    date_init:{type:Date, required:true},
    accused:{type:String,required:true},
    victimas:{type:String,required:true},
    fojas_number:{type:String,required:true},
    detail_sum:{type:String,required:true},
    nurek_number:{type:String,required:true},
    created_at    : { type: Date, default:new Date() }, 
    updated_at    : { type: Date, default:new Date() }
})
descriptionDataDiarybook.pre('update', function(next){
     now = new Date();
     this.updated_at = now;    
     next();
});
module.exports= mongoose.model('DescriptionDiarybook',descriptionDataDiarybook);