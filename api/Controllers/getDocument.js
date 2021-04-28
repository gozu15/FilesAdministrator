"use strict";
//import {Powerpoint, Word} from 'pdf-officegen'
const googlevision= require('@google-cloud/vision');
const mammoth = require('mammoth');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const TurnDown= require('turndown')
let turndownservice = new TurnDown();
const modelDocument = require('../Models/image_object.model');
const url= './uploads/'


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
async function updateDataDocument(req,res){
    let id = req.params.id
    let data = req.body;
    modelDocument.update({_id:id},data)
    .then(response =>{
        console.log(response);
        res.status(200).send(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

async function deleteDataDocument(req,res){
    let id = req.params.id    
    modelDocument.deleteOne({_id:id},data)
    .then(response =>{
        console.log(response);
        res.status(200).send({message:response});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({message:'Error to delete', error:err });
    })
}

async function getImageByName(req,res){
    let name = req.params.name
    fs.readFile(url+name,(err, data) =>{
        var contentType = 'image/png';
        var base64 = Buffer.from(data).toString('base64');
        base64='data:image/png;base64,'+base64;
            res.status(200).send({
            message: "Archivo obtenido correctamente",           
            image:base64
            })    
    })

}


//UPDATE DOCUMENT FILE INIT
async function RequestDocument(req, res) {
    
    let file = req.files.file;
    console.log(file);
    if (file != undefined && file != null) {
        let checkpath = file.path.split('\\')
        let getextension = file.type
        modelDocument.create({
            url_uploaded:checkpath[1],
            type_image: getextension           
        }).then(response =>{
           fs.readFile(url+response.url_uploaded,(err, data) =>{
                var contentType = 'image/png';
                var base64 = Buffer.from(data).toString('base64');
                base64='data:image/png;base64,'+base64;    
                console.log(response)
                    res.status(200).send({
                    message: "Archivo subido correctamente",
                    data:response,
                    image:base64
                    })    
            })
            
        })
        .catch(err =>{
            res.status(500).send("ocurrio un error")
            console.log(err);
        })
        
        
    } else {
        res.status(500).send({
            message: "Hubo un problema al subir el archivo..."
        })
    }

}

async function ReadDocumentToRelationship(req,res){
    modelDocument.find()
    .then(response =>{
        console.log(response)
        res.status(200).send(response);
    })
    .catch(err =>{
        res.status(500).send(err);
    })
}

//FUNCION DE PRUEBA CON MODULO MAMMOTH PARA OBTENER TEXTO DE ARCHIVOS .DOCX
async function ReadDocument(req,res){
   //await ConvertDocumentToHtml();
   
   mammoth.convertToHtml({path: `${url}wer465we4r564wer.docx`} )
    .then((result) => {        
        //convierte datos html a markdown
        let markdown = turndownservice.turndown(result.value)
        let newtext= CountDATA(turndownservice.turndown(result.value));        
        //crea un archivo extension .md y guarda el texto markdown
        fs.writeFileSync(`${url}/exampleMarkdown.md`,markdown);        
        console.log({message:result.messages, html: result.value, markdown:markdown});
        console.log("textoNuevo",newtext);
        res.status(200).send({message:"Documento convertido",text:markdown});
        
    }).catch((err) => {
        console.log("ocurrio un error",err);        
    });
   
}

async function ReadMarkdownFile(req,res){
    let posicion= searchAText("Tutor:",`${url}exampleMarkdown.md`)
    res.status(200).send({message:posicion});
}

async function searchAText(texto,archivo){
    let checkFile= fs.readFileSync(archivo)
   
    let auxLector = ""+checkFile.split(" ");
   
    let cont=-1;
    let position=0;
    
    auxLector.forEach(element => {
        cont++;
        if(element == texto){
            console.log("EURECA");
            position= cont;            
        }
    });
    return position;
}

function CountDATA (str) {
    let findit= true
        let count = 0;
        let auxtext= ""
	//4488 caracteres tiene una pagina word completamente lleno
        while(findit && count <=50)
        {
            auxtext += str[count];
            count++; 
        }
    
	return auxtext;
};
//FUNCION PARA OBTENER TEXTO DE ARCHIVOS PDF MODULO PDF-PARSE
async function ReadPdfDocument(req,res){   
  let dataBuffer = fs.readFileSync(`${url}ZzcrLgUAcACNbJ9M1DTA90FF.pdf`);
  pdfParse(dataBuffer).then((data)=>{
   
    console.log(data.text);
    res.status(200).send({message:data.text});
    
    //algoritmo de busqueda. 
      
  })
  .catch(err =>{
     res.status(500).send({message:err});
  })  
}

    function checkStringIfIsValidToBuildDate(text=""){
        let new_date= null;  
        let length = text.length
        if(length ==10 || length == 8){            
            for (let index = 0; index < length; index++) {
                console.log("StringIsValid",text[index]);                
                if(text[index] == '/')
                {
                    
                }
                new_date.push(text[index]);             
            }
            return new_date;
        }
        
        
    }

async function OCRGoogleAPI(req,res){
    let nameimage=req.params.name
    console.log("nameimg",nameimage)
    const ocr = new googlevision.ImageAnnotatorClient();
    ocr.textDetection(`${url}${nameimage}`)
    .then(response =>{
        //response[0].fullTextAnnotation.text
        let obj = []
        let textfull=response[0].fullTextAnnotation.text
        let text =""
        let newparagarph ={}
        let newobject_TXT={}
        let contparagraph=0
        let pages= response[0].fullTextAnnotation.pages        
        
        
        pages.forEach(element => {
            element.blocks.forEach(blocks =>{
                blocks.paragraphs.forEach(paragraphs =>{
                    contparagraph++;
                    paragraphs.words.forEach(words =>{
                        words.symbols.forEach(symbol =>{
                            text += symbol.text
                        })
                        text +=" "
                    })
                    newparagarph={
                        num:contparagraph,                        
                        paragraphtext:text
                    }
                    obj.push(newparagarph);
                    text=""
                })
            })

        });
        let appellant = false
        let accused = false
        let victim = false
        let auxcontquere = null
        let auxcontimput = null
        let auxcontvict = null
        let contaux=0
        let opqwe = checkStringIfIsValidToBuildDate(obj[2].paragraphtext);
        console.log("t",opqwe);
        console.log(obj);
        obj.forEach(element => {
            
            contaux++;
            //OBTENEMOS CODIGO DE DOCUMENTO
           
            if(element.num == 4 ){
                
                let splitresponse = element.paragraphtext.split(':')
                newobject_TXT.code_document= splitresponse[1]
            }
            if(element.num == 6){
                let splitresponse = element.paragraphtext.split(':')
                let hours =""+splitresponse[2]+":"+splitresponse[3]
                newobject_TXT.date_admission = splitresponse[1]
                newobject_TXT.hours_admission = hours
                newobject_TXT.relevant_court =splitresponse[5]
                newobject_TXT.crime = splitresponse[6]                
                newobject_TXT.process_type = splitresponse[7]
            }
            if(element.paragraphtext == 'QUERELLANTES ' ){
                newobject_TXT.appellant=[]
                auxcontquere = element.num
                appellant = true
                accused = false
                victim = false
            }
           
            if(element.paragraphtext == 'IMPUTADOS '){
                newobject_TXT.accused=[]
                auxcontimput = element.num
                accused = true
                appellant = false
                victim= false
            }
             if(element.paragraphtext == 'VICTIMAS '){
                newobject_TXT.victim=[]
                auxcontvict = element.num
                accused = false
                appellant = false
                victim = true
            }
             if(auxcontquere != null && contaux > auxcontquere && appellant){
                 let bool = element.paragraphtext.search(':') 
                
                 if(bool != -1){
                     let splitresponse = element.paragraphtext.split(':')
                newobject_TXT.appellant.push(splitresponse[1])
                 }
                 else{
                     newobject_TXT.appellant.push(element.paragraphtext)
                 }               
                
            }
              if(auxcontimput != null && contaux > auxcontimput && accused){
                let bool = element.paragraphtext.search('sable de') 
                console.log("accused",element.paragraphtext);
                if(bool == -1){
                    newobject_TXT.accused.push(element.paragraphtext)
                }
                else{
                    accused = false
                }         
                
            }            
              if(auxcontvict != null && contaux > auxcontvict && victim){
                  let bool = element.paragraphtext.search('ble de') 
                  console.log("check victim",bool);
                  if(bool == -1){
                    newobject_TXT.victim.push(element.paragraphtext)
                  }
                  else{
                      victim=false
                  }
                

            }
        });        

        console.log(newobject_TXT)
    
        //modelDocument.create()        
    
        //TODO GUARDAR EN BASE DE DATOS EL OBJETO, CREAR EL ARCHIVO .MD, 
        res.status(200).send({object:newobject_TXT});          
    })
    .catch(error =>{
        res.status(500).send({error:error});
        console.log("ocurrio un error",error)
    })
}



//DOCUMENT FILE END
module.exports = {    
    RequestDocument,
    ReadDocument,
    CreateDataDocument,
    ReadPdfDocument,    
    ReadMarkdownFile,
    OCRGoogleAPI,
    ReadDocumentToRelationship,
    updateDataDocument,
    deleteDataDocument,
    getImageByName,
}