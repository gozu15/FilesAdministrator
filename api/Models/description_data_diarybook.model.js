'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const descriptionDataDiarybook = new schema({
    entry_date:{type:Date, required:true, default:new Date()},
    departure_date:{type:Date, required:true,default:new Date()},
    accused:[],
    victim:[],
    appellant:[],
    fojas_number:{type:String,required:true},
    detail_sum:{type:String,required:true},
    nurek_number:{type:String,required:true},
    isdelete:{type:Boolean,required: true, default:false},
    created_at    : { type: Date, default:new Date() }, 
    updated_at    : { type: Date, default:new Date() }
})
descriptionDataDiarybook.pre('update', function(next){
     const now = new Date();
     this.updated_at = now;    
     next();
});
module.exports= mongoose.model('DescriptionDiarybook',descriptionDataDiarybook);