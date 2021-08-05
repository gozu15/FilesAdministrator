'use strict'
const modelDiarybook = require('../Models/diary_books.model');
const modeldescriptionDiarybook = require('../Models/description_data_diarybook.model');
//const { model } = require('../Models/diary_books.model');
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
        .then(resultdescription =>{         
            //res.status(200).send(resultdescription);   
            modelDiarybook.update({_id:idbook},{$push:{book_content:resultdescription._id}})
            .then(result =>{
                console.log(result);
                res.status(200).send({message:"Datos agregados",data:result})
            })
            .catch(err =>{
                console.log(err);
                res.status(500).send({message:err})
            })
        })
        .catch(err =>{
            res.status(500).send({messsage:err});   
        })
    }

    async findDiaryBookComplete(req,res){   
        
        modelDiarybook.find({isdelete:false}).populate({path:'book_content',match:{isdelete:false},select:{}})
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
       
        modelDiarybook.findOne({_id:id,isdelete:false}).populate({path:'book_content',match:{isdelete:false},select:{}})
        .then(result =>{
            console.log(result);
            res.status(200).send({message:"Datos obtenidos",data:result});
        })
        .catch(err =>{
            res.status(500).send({message:"Ocurrio un error al obtener los datos",data:err});
        })
    }

    async findDiarybook(req,res){
        modelDiarybook.find({isdelete:false})
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
        modelDiarybook.find({_id:id,isdelete:false})
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

    async updateContentDiarySelected(req,res){
        let idcontent = req.params.id;
        let data = req.body;
        modeldescriptionDiarybook.update({_id:idcontent},data)
        .then(response =>{
            console.log(response)
            res.status(200).send(response)
        })
        .catch(err =>{
            console.log({message:err});
            res.status(500).send({message:err})
        })
    }
    async deleteDiaryBook(req,res){
        let id = req.params.id
        let delete_data= {isdelete:true};
        modelDiarybook.update({_id:id},delete_data)
        .then(response =>{
            res.status(200).send(response);
            console.log(response)
        })
        .catch(err =>{
            res.status(500).send(err);
                console.log({message:err})
        })
    }

    async deleteContentFromDiaryBook(req,res){
        let id = req.params.id
        let delete_data= {isdelete:true};
        modeldescriptionDiarybook.update({_id:id},delete_data)
        .then(response =>{            
            res.status(200).send(response);
            console.log(response)
        })
        .catch(err =>{
            res.status(500).send(err);
                console.log({message:err})
        })
    }
}
module.exports = new DiaryBook();

