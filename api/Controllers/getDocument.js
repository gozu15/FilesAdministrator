"use strict";
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
    if(data != undefined && data != null){
        modelDocument.create(data).then(response =>{           
            res.status(200).send(response);
        })
        .catch(err =>{
            console.log(err)
            res.status(500).send(err);
        })
    }
}
async function updateDataDocument(req,res){
    let id = req.params.id
    let data = req.body;
    modelDocument.update({_id:id},data)
    .then(response =>{
       res.status(200).send(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send(err);
    })
}

async function deleteDataDocument(req,res){
    let id = req.params.id    
    let data= {isdelete: true}
    modelDocument.update({_id:id},data)
    .then(response =>{
       res.status(200).send({message:response});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({message:'Error to delete', error:err });
    })
}

async function ReadDocumentToRelationship(req,res){
    // const PAGE_SIZE = 5
    // let page_number = req.query.page;
    // let skip = (page_number - 1) * PAGE_SIZE    
    modelDocument.find({isdelete:false})
    // .skip(skip)
    // .limit(PAGE_SIZE)
    .then(response =>{       
        res.status(200).send(response);
    })
    .catch(err =>{
        res.status(500).send(err);
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

async function RequestDocument(req, res) {    
    let file = req.files.file;    
    if (file != undefined && file != null) {
        let checkpath = file.path.split('\\')
        let getextension = file.type
        modelDocument.create({
            url_uploaded:checkpath[1],
            type_image: getextension           
        }).then(response =>{
           fs.readFile(url+response.url_uploaded,(err, data) =>{                
                let base64 = Buffer.from(data).toString('base64');
                base64='data:image/png;base64,'+base64;                   
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

async function FindDataFromCoverInformationImage(req,res){
    let accused = req.query.accused;
    let victim = req.query.victim;
    let appellant = req.query.appellant;
    let crime = req.query.crime;
    let page_number = req.query.page;
    let code_document = req.query.code_document;    
    const PAGE_SIZE = 5    
    let skip = (page_number - 1) * PAGE_SIZE
    
    modelDocument.find({$or:[
    {'victim':{ $regex: `${victim}` , $options: 'i' },'isdelete':false}, 
    {'accused':{ $regex: `${accused}` , $options: 'i' },'isdelete':false},
    {'appellant':{ $regex: `${appellant}` , $options: 'i' },'isdelete':false},
    {'crime':{ $regex: `${crime}` , $options: 'i' },'isdelete':false},
    {'code_document':{ $regex: `${code_document}` , $options: 'i' },'isdelete':false},
    ]},
     {},    
 (error,victima) =>{
        if(error) res.status(500).send({message:error})       
        res.status(200).send({message:victima});
    }).skip(skip)
    .limit(PAGE_SIZE);   
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

//FUNCION PARA OBTENER TEXTO DE ARCHIVOS PDF MODULO PDF-PARSE
async function ReadPdfDocument(req,res){   
  let dataBuffer = fs.readFileSync(`${url}ZzcrLgUAcACNbJ9M1DTA90FF.pdf`);
  pdfParse(dataBuffer).then((data)=>{   
    console.log(data.text);
    res.status(200).send({message:data.text});    
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
                    new_date.push(text[index]);
                }                             
            }
            return new_date;
        }       
        
    }

async function OCRGoogleAPI(req,res){
    let nameimage=req.params.name    
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
        obj.forEach(element => {            
            contaux++;           
            if(element.num == 4 ){
                
                let splitresponse = element.paragraphtext.split(':')
                newobject_TXT.code_document= splitresponse[1] !=undefined ? splitresponse[1] : null
            }
            if(element.num == 6){
                let splitresponse = element.paragraphtext.split(':')                
                let hours =""+(splitresponse[2]!= undefined ? splitresponse[2] : "12")+":"+(splitresponse[3]!= undefined ?splitresponse[3] : "00")
                hours = (hours == "12:00" ? null : hours);
                newobject_TXT.date_admission = splitresponse[1]  != undefined ?splitresponse[1] : null
                newobject_TXT.hours_admission = hours != undefined ?hours : null
                newobject_TXT.relevant_court =splitresponse[5] != undefined ?splitresponse[5] : null
                newobject_TXT.crime = splitresponse[6]    != undefined ?splitresponse[6] : null             
                newobject_TXT.process_type = splitresponse[7] != undefined ?splitresponse[7] : null
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
                    newobject_TXT.appellant.push((splitresponse[1] != undefined ?splitresponse[1] : ""))
                 }
                 else{
                     newobject_TXT.appellant.push((element.paragraphtext != undefined ? element.paragraphtext :""))
                 }               
                
            }
              if(auxcontimput != null && contaux > auxcontimput && accused){
                let bool = element.paragraphtext.search('sable de')                 
                if(bool == -1){
                    newobject_TXT.accused.push((element.paragraphtext!= undefined ? element.paragraphtext :""))
                }
                else{
                    accused = false
                }         
                
            }            
              if(auxcontvict != null && contaux > auxcontvict && victim){
                  let bool = element.paragraphtext.search('ble de')                  
                  if(bool == -1){
                    newobject_TXT.victim.push((element.paragraphtext != undefined ? element.paragraphtext : ""))
                  }
                  else{
                      victim=false
                  }
                

            }
        });        

        console.log(newobject_TXT)
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
    CreateDataDocument,
    ReadPdfDocument,    
    ReadMarkdownFile,
    OCRGoogleAPI,
    ReadDocumentToRelationship,
    updateDataDocument,
    deleteDataDocument,
    getImageByName,
    FindDataFromCoverInformationImage,
}