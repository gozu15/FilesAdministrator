'use strict'
const modelDiarybook = require('../Models/diary_books.model');
const modeldescriptionDiarybook = require('../Models/description_data_diarybook.model');
const { model } = require('../Models/diary_books.model');
class DiaryBook{
    async createDiarybook(req,res){
        let data = req.body        
        modelDiarybook.create(data)
        .then((result) => {
            console.log(result)
            let responce = {message:"Dato registrado", data :result}
            res.status(200).send(responce)
        }).catch((err) => {
             console.log({message:"Ocurrio un error al registrar", data :err})
            res.status(500).send({message:"Ocurrio un error al registrar", data :err})
        });
    }
    async addnewDocumentToBook(req,res){
        let idbook = req.params.idbook
        let data = req.body;
        console.log("soy idbook",idbook)
        console.log("soy data",data)
        modeldescriptionDiarybook.create(data)
        .then(result =>{
            modelDiarybook.update({_id:idbook},{$push:{description_data:result._id}})
            .then(result =>{
                console.log(result);
                res.status(200).send({message:"Datos agregados",result:result})
            })
            .catch(err =>{
                console.log(err);
                res.status(500).send({message:"error en los datos",result:err})
            })
        })
        .catch(err =>{

        })
    }

    async findDiaryBookComplete(req,res){   
        
        modelDiarybook.find({}).populate('description_data',{},'DescriptionDiarybook')
        .then(result =>{
            console.log(result);
            res.status(200).send({message:"Datos obtenidos",data:result});
        })
        .catch(err =>{
            res.status(500).send({message:"Ocurrio un error al obtener los datos",data:err});
        })
    }
    

    async findDiaryBookbyIdComplete(req,res){
        let id = req.params.id;
       
        modelDiarybook.findOne({_id:id}).populate('description_data')
        .then(result =>{
            console.log(result);
            res.status(200).send({message:"Datos obtenidos",data:result});
        })
        .catch(err =>{
            res.status(500).send({message:"Ocurrio un error al obtener los datos",data:err});
        })
    }

    async findDiarybook(req,res){
        modelDiarybook.find({})
        .then((result) => {
            console.log({message:"Datos encontrados", data :result})
            res.status(200).send({message:"Datos encontrados", data :result})
        }).catch((err) => {
             console.log({message:"Ocurrio un error al registrar todo", data :err})
            res.status(500).send({message:"Ocurrio un error al obtener los datos", data :err})
        });
    }
     async findbyIdDiarybook(req,res){
         let id = req.params.id
         console.log("this is id",id);
        modelDiarybook.find({_id:id})
        .then((result) => {
            console.log({message:"Datos encontrados", data :result})
            res.status(200).send({message:"Datos encontrados", data :result})
        }).catch((err) => {
             console.log({message:"Ocurrio un error al registrar id", data :err})
            res.status(500).send({message:"Ocurrio un error al obtener los datos", data :err})
        });
    }

    async updateDiarybook(req,res){
         let id = req.params.id
         let data = req.body
        modelDiarybook.update({_id:id},data)
        .then((result) => {
            console.log({message:"Datos encontrados", data :result})
            res.status(200).send({message:"Datos encontrados", data :result})
        }).catch((err) => {
             console.log({message:"Ocurrio un error al registrar", data :err})
            res.status(500).send({message:"Ocurrio un error al registrar", data :err})
        });
    }
}
module.exports = new DiaryBook();

