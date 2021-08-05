
const mongoose = require ('mongoose');
const schema = mongoose.Schema;
let Librarylawsandregulations =  new schema({    
    name:{type:String, required:true},
    description:{type:String, required:true, default:"No existe una descripcion"},
    pdf_url:{type:String,required:true},
    pdf_name:{type:String,required:true},
    isdelete:{type:Boolean,required: true, default:false},
    created_at    : { type: Date,default:new Date()  },
    updated_at    : { type: Date,default:new Date()  }
})
Librarylawsandregulations.pre('create', function(next){
     now = new Date();
     this.updated_at = now;
     if ( !this.created_at ) {
       this.created_at = now;
     }
     next();
});
module.exports = mongoose.model('Lawslibrary', Librarylawsandregulations);