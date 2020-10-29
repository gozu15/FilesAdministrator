"use strict";
const mammoth = require('mammoth');
const modelDocument = require('../Models/document.model');
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
   await ConvertDocumentToHtml();
   res.status(200).send({message:"Documento convertido"});
}

async function ConvertDocumentToHtml(){
    mammoth.convertToHtml({path: `${url}wer465we4r564wer.docx`} )
    .then((result) => {        
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
    CreateDataDocument
}