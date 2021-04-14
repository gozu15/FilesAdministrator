'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const diaryBookSchema = new schema({
    book_name:{type:String, default:"Libro sin nombre", required:true},
    year_of_management:{type:Date, default:new Date(), required:true},
    description_data:[{
        type:schema.Types.ObjectId,
        ref:'DescriptionDiarybook'
    }],
    created_at    : { type: Date }, 
    updated_at    : { type: Date }

})
diaryBookSchema.pre('update', function(next){
     now = new Date();
     this.updated_at = now;     
     next();
});


module.exports = mongoose.model('Diarybook',diaryBookSchema);