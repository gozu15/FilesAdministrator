"use strict";
const { response } = require('express');
const mammoth = require('mammoth');
const fs = require('fs');
const pdfParse = require('pdf-parse');
let textMarkDown ="";
const modelDocument = require('../Models/document.model');
const { model } = require('../Models/holamundo.model');
//hello wordl example
const modelHello = require('../Models/holamundo.model');
const url= './uploads/'
async function GetDocument(req, res) {
    //TODO Obtener documento y guardarlo en una carpeta
    res.status(200).send({
        hola: "HOLA MUNDO"
    });
    console.log("ENTRAN GET DOCUMENTS");
}

async function CreateDataDocument(req,res){
    let data = req.body;
    console.log("SOIY DATA",data);   
    if(data != undefined && data != null){
        modelDocument.create(data, (response) =>{
            console.log(response);
            res.status(200).send(response);
        })
    }
}
//EXAMPLE HELLO WORDL FUNCTIONS
async function Create(req,res){
    let data = req.body;
    modelHello.create(data
        // ,(response)=>{
        // console.log(response);      
    //}
    ).then(response =>{
        console.log("this is response",response);
        res.status(200).send({message:response})
    })
    .catch(err =>{
        console.log("error filter",err);
        res.status(400).send({error:err});
    })
}
async function Read(req,res){   
    modelHello.find()
    .then(response =>{        
        console.log(response);
        res.status(200).send({message:response});

    }).catch(err =>{
        console.log(err);
        res.status(200).send({error:err});
    })
}

async function ReadbyID(req,res){
    let id= req.params.id
    modelHello.find({_id:id})
    .then(response =>{        
        console.log(response);
        res.status(200).send({message:response});

    }).catch(err =>{
        console.log(err);
        res.status(200).send({error:err});
    })
}

async function Update(req,res){
    let data = req.body;
    let id = req.params.id
    modelHello.update({_id:id},data)
    .then(response =>{
        console.log(response);
        res.status(200).send({message:response});
    }).catch(err =>{
        console.log(err);
        res.status(400).send({message:err});
    })
}

async function Delete(req,res){
    let id = req.params.id;
    modelHello.deleteOne({_id:id})
    .then(response =>{
        console.log(response);
        res.status(200).send({message:response});
    })
    .catch(err =>{
        res.status(400).send({error:err});
    })
}
//END EXAMPLE HELLOWORLD

//UPDATE DOCUMENT FILE INIT
async function RequestDocument(req, res) {
    console.log("BODY REQUEST", req);
    if (req.body != undefined && req.body != null) {
        res.status(200).send({
            message: "Archivo subido correctamente"
        })
    } else {
        res.status(404).send({
            message: "Hubo un problema al subir el archivo..."
        })
    }

}

async function ReadDocument(req,res){
   //await ConvertDocumentToHtml();
   mammoth.convertToMarkdown({path: `${url}NqFd_G4cnQjg6XxJCdtcO9xc.docx`} )
    .then((result) => {        
        
        console.log({message:result.messages, html: result.value});
        res.status(200).send({message:"Documento convertido",text:result.value});
        
    }).catch((err) => {
        console.log("ocurrio un error",err);        
    });
   
}

async function ReadPdfDocument(req,res){    
   const pdfFile= fs.readFileSync(`${url}ZzcrLgUAcACNbJ9M1DTA90FF.pdf`);
  pdfParse(pdfFile).then((response)=>{
    console.log(response.info);
    res.status(200).send({message_info:response.info, message_text:response.text})
  })
  .catch(err =>{
      console.log({message:err});
  })
}

async function ConvertDocumentToHtml(){
    mammoth.convertToMarkdown({path: `${url}wer465we4r564wer.docx`} )
    .then((result) => {        
        textMarkDown = result.value;
        console.log({message:result.messages, html: result.value});
        
    }).catch((err) => {
        console.log("ocurrio un error",err);        
    });
}
//DOCUMENT FILE END
module.exports = {
    GetDocument,
    RequestDocument,
    ReadDocument,
    CreateDataDocument,
    ReadPdfDocument,
    Create,
    Read,
    Update,
    Delete,
    ReadbyID
}