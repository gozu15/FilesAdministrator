'use strict'
const NOTIFY_MODEL = require('../Models/notify_audience.model');
function GETALL(req,res){

}
function GetAllInProcessNotDelete(req,res){   
    NOTIFY_MODEL.findOne({$or:[{isdelete:false,status:'LLEGANDO A TERMINO'},{isdelete:false,status:'EN PROCESO'}]}).sort({date_end:1})
    .then(result =>{  
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({message:err});
    })
}
function GetAllandNotDelete(req,res){
    let getstatus = (req.query.status != undefined ? req.query.status.split('/') : ['EN ESPERA']);
    console.log("Get",req.query.status);
    let critery =[]
    getstatus.forEach(element => {
        let check={'isdelete':false, 'status':element};
        critery.push(check)
    });
     
    NOTIFY_MODEL.find({$or:critery}).sort({date_end:-1})
    .then(result =>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err =>{
        res.status(500).send(err);
    })
}
function GetAllandNotDeleteById(req,res){

}
function Create(req,res){
    let data = req.body;
    NOTIFY_MODEL.create(data)
    .then(result =>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({message:err});
    })

}
function Update(req,res){
    let data = req.body;
    let id = req.params.id
    NOTIFY_MODEL.update({_id:id},data)
    .then(result =>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send({message:err});
    })
}
function Delete(req,res){
    let id = req.params.id
    let data = {
        isdelete:true
    }
    NOTIFY_MODEL.update({_id:id},data)
    .then(result =>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send({message:err});
    })
}
module.exports ={
    GetAllandNotDelete,
    GetAllandNotDeleteById,
    GetAllInProcessNotDelete,
    Create,
    Update,
    Delete,
    GETALL
}