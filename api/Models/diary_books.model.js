'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const diaryBookSchema = new schema({
    book_name:{type:String, default:"Libro sin nombre", required:true},
    year_of_management:{type:String, default:(new Date().getFullYear+"/1"), required:true},
    description:{type:String,default:"No existe una descripcion"},
    book_content:[{
        type:schema.Types.ObjectId,
        ref:'DescriptionDiarybook'
    }],
    isdelete:{type:Boolean,required: true, default:false},
    created_at    : { type: Date }, 
    updated_at    : { type: Date }

})
diaryBookSchema.pre('update', function(next){
     const now = new Date();
     this.updated_at = now;     
     next();
});


module.exports = mongoose.model('Diarybook',diaryBookSchema);