const mongoose = require ('mongoose');
const schema = mongoose.Schema;
let DocumentModel =  new schema({
    identify_number:{type:String, required:true},   
    tittle:{type:String, required:true},
    document_name:{type:String, required:true},
    court_name:{type:String, required:true},
    created_at    : { type: Date }, 
    updated_at    : { type: Date }
})
DocumentModel.pre('create', function(next){
     now = new Date();
     this.updated_at = now;
     if ( !this.created_at ) {
       this.created_at = now;
     }
     next();
});
module.exports = mongoose.model('Document', DocumentModel);