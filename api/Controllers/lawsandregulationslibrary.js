'use strict'
//const PdfReader = require('pdfreader').PdfReader;
let absolute_path_to_pdf = '../uploads/ZzcrLgUAcACNbJ9M1DTA90FF.pdf';
let options = {}
const LIBRARY_MODELDB = require('../Models/librarylawsandregulations.model.js')
const url= './uploads/'
const fs = require('fs');
let propertiespdf={
   name:null,
   url:null
};

function GETALL(req,res){
   LIBRARY_MODELDB.find()
   .then(result =>{
      console.log(result);
      res.status(200).send(result);
   })
   .catch(err =>{
      res.status(500).send(err);
   })
}

function GetLibraryBooksAll(req,res){
   LIBRARY_MODELDB.find({isdelete:false})
   .then(result =>{
      console.log(result);
      res.status(200).send(result);
   })
   .catch(err =>{
      res.status(500).send(err);
   })
}
function UpdateLibraryBook(req,res){
   let id = req.params.id
   let data = req.body;
   LIBRARY_MODELDB.update({_id:id},data)
   .then(resolve =>{
      console.log(resolve);
      res.status(200).send(resolve)
   })
   .catch(err =>{
      console.log(err);
      res.status(500).send({message:err})
   })
}

function DeleteLibraryBook(req,res){
   let id = req.params.id;
   let deletePDF = {isdelete : true}
   LIBRARY_MODELDB.update({_id:id},deletePDF)
   .then(resolve => {
      console.log(resolve);
      res.status(200).send(resolve);
   })
   .catch(err =>{
      console.log(err);
      res.status(500).send({message:err});
   })
}

function CreateLibrary(req,res){
   let data = req.body;
   let newlibrary = {
      name:data.name,
      description:data.description,
      pdf_url:propertiespdf.url,
      pdf_name:propertiespdf.name,
   }
   LIBRARY_MODELDB.create(newlibrary)
   .then(response =>{
      console.log(response);
      res.status(200).send(response)
   })
   .catch(err =>{
      console.log(err);
      res.status(500).send({message:err});
   })
}

//TODO Enviar archivo pdf desde el servidor al cliente.  
function UploadPDFFile(req,res){
   let file = req.files.file;     
   if(file != undefined && file != null){
      let checkpath =file.path.split('\\');
      let name = checkpath[1];
      let url = "http://localhost:3000/api/lawsandregulations/"+name;
      propertiespdf={
         name: name,
         url:url
      }      
      res.status(200).send("Se subio archivo al servidor")
   }

   
}
function GetPDFFile(req,res){
   let namepdf = req.params.name;//'ZzcrLgUAcACNbJ9M1DTA90FF'
   console.log("PDF SERVER",namepdf);
   fs.readFile(`${url}`+namepdf,(err,data)=>{
      //let jsfile = new Buffer.from(data).toString('base64');
      res.contentType("application/pdf");
      res.status(200).send(data);
   });
  
};
module.exports={
   GetPDFFile,
   UploadPDFFile,
   CreateLibrary,
   GetLibraryBooksAll,
   UpdateLibraryBook,
   DeleteLibraryBook
}

