'use strict'
   const modelMemorialesDecretos = require('../Models/memorials_decretos_modelo');    
    async function Create(req,res){
        let data = req.body;
        console.log(data);
        modelMemorialesDecretos.create(data)
        .then((result) => {
            res.status(200).send({message:"Se guardo correctamente",result:result})
        }).catch((err) => {
            res.status(500).send({message:"Ocurrio un error",result:err})
        });
    }
    async function Read(req,res){
        modelMemorialesDecretos.find()
        .then(result =>{
            console.log(result);
            res.status(200).send({message:"Se realizo peticion correctamente",result:result})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({message:"Ocurrio un error",result:err})
        })
    }


module.exports= {
    Create,
    Read
};