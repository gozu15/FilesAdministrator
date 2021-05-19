'use strict'
   const modelMemorialesDecretos = require('../Models/memorials_decrets_modelo');    
    async function Create(req,res){
        let data = req.body;
        console.log(data);
        modelMemorialesDecretos.create(data)
        .then((result) => {
            res.status(200).send({message:"Se guardo correctamente",data:result})
        }).catch((err) => {
            res.status(500).send({message:"Ocurrio un error",result:err})
        });
    }
    async function Read(req,res){
        let page_number = req.query.page;
        const PAGE_SIZE = 5    
        let skip = (page_number - 1) * PAGE_SIZE
        modelMemorialesDecretos.find().skip(skip).limit(PAGE_SIZE)
        .then(result =>{
            console.log(result);
            res.status(200).send({message:"Se realizo peticion correctamente",data:result})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({message:"Ocurrio un error",result:err})
        })
    }

    async function ReadbyId(req,res){
        const ID= req.params.id
        modelMemorialesDecretos.find({_id:ID})
        .then(result =>{
            console.log(result);
            res.status(200).send({message:"Se realizo peticion correctamente",data:result})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({message:"Ocurrio un error",result:err})
        })
    }

    async function Update(req,res){
        const DATA = req.body;
        console.log(DATA);
        const ID = req.params.id
        modelMemorialesDecretos.update({_id:ID},DATA)
        .then(response =>{
            console.log(response);
            if(response.nModified == 1){
                res.status(200).send({message:"Done",data:response});
            }
            else{
                res.status(500).send({message:"Data unknown",response:response});
            }
            
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({message:"Ocurred an error",error:err});
        })
    }

    async function Delete(req,res){        
        const ID = req.params.id
        modelMemorialesDecretos.deleteOne({_id:ID})
        .then(response =>{
            console.log(response);
            res.status(200).send({message:"Done",data:response});
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({message:"Ocurred an error",error:err});
        })
    }

    async function GetMemorialsByType(req,res){
        const param =""+req.query.type;
        let check_critery = param.split('/')
        console.log(check_critery);
        let critery =[]
        check_critery.forEach(element =>{
            let typedocument = {'type_document':`${element}`}
            critery.push(typedocument);
        })
       console.log(critery);
        let page_number = req.query.page;
        const PAGE_SIZE = 5    
        let skip = (page_number - 1) * PAGE_SIZE
        modelMemorialesDecretos.find({$or:critery}).skip(skip).limit(PAGE_SIZE)
        .then(response =>{
            console.log(response);
            res.status(200).send({message:"Done",data:response})
        })
        .catch(err =>{

        })
    }


module.exports= {
    Create,
    Read,
    Update,
    Delete,
    ReadbyId,
    GetMemorialsByType
};