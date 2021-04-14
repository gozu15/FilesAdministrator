'use strict'
const modelDocument = require('../Models/model_documents_struct.model');
class ModelsController {
    async create(req,res){
        let body = req.body;
        modelDocument.create(body)
        .then(response =>{
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send(err);
            console.log(err)
        })
    }
    async find(req,res){
         modelDocument.find()
        .then(response =>{
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send(err);
            console.log(err)
        })
    }
}
module.exports= new ModelsController()