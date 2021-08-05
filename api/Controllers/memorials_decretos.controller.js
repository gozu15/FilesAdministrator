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
        let page_size = req.query.size;
        console.log("PAGESIZE",page_size)
        let PAGE_SIZE = 5
        let skip
        if(page_size == null || page_size == undefined){ 
            console.log("ENTRO IF")            
           skip = (page_number - 1) * PAGE_SIZE
           modelMemorialesDecretos.find({isdelete:false}).skip(skip).limit(PAGE_SIZE)
           .then(result =>{
               console.log(result);
               res.status(200).send({message:"Se realizo peticion correctamente",data:result})
           })
           .catch(err =>{
               console.log(err);
               res.status(500).send({message:"Ocurrio un error",result:err})
           })
        }           
        else{
            console.log("ENTRO ELSE")      
            PAGE_SIZE = page_size
            skip = (page_number - 1) * PAGE_SIZE
            modelMemorialesDecretos.find({isdelete:false}).skip(skip).limit(PAGE_SIZE)
            .then(result =>{
                console.log(result);
                res.status(200).send({message:"Se realizo peticion correctamente",data:result})
            })
            .catch(err =>{
                console.log(err);
                res.status(500).send({message:"Ocurrio un error",result:err})
            })
        }
        
       
    }

    async function ReadbyId(req,res){
        const ID= req.params.id
        modelMemorialesDecretos.find({_id:ID,isdelete:false})
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
        let delete_memorial = {isdelete : true};
        modelMemorialesDecretos.update({_id:ID},delete_memorial)
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
            let typedocument = {'type_document':`${element}`,'isdelete':false}
            critery.push(typedocument);
        })
       console.log(critery);
        let page_number = req.query.page;
        let row_persize = parseInt(req.query.size);
        console.log(row_persize);
        let PAGE_SIZE = row_persize;
        let skip = (page_number - 1) * PAGE_SIZE        
        modelMemorialesDecretos.find({$or:critery}).skip(skip).limit(PAGE_SIZE)
        .then(response =>{
            console.log(response);
            res.status(200).send({message:"Done",data:response})
        })
        .catch(err =>{

        })
    }

    async function FindDataFromSearchButton(req,res){
        console.log("ENTRE")
        let name = req.query.name;
        let description = req.query.description;
        let documents_text = req.query.documents_text;
        let row_persize = parseInt(req.query.size);
        console.log("name",name)
        console.log("des",description)
        console.log("doc",documents_text)

        const param =""+req.query.type;
        let check_critery = param.split('/')
        console.log(check_critery);
        let critery =[]
        check_critery.forEach(element =>{
            let typedocument = {'type_document':`${element}`,'isdelete':false}
            critery.push(typedocument);
        })
       console.log(critery);
       
        let page_number = req.query.page;        
        let PAGE_SIZE = row_persize
        let skip = (page_number - 1) * PAGE_SIZE
        
        modelMemorialesDecretos.find({$and:[{$or:critery},{$or:[
            {'name':{ $regex: `${name}` , $options: 'i' },'isdelete':false}, 
            {'description':{ $regex: `${description}` , $options: 'i' },'isdelete':false},
            {'documents_text':{ $regex: `${documents_text}` , $options: 'i' },'isdelete':false},        
            ]}]} ,
         {},    
     (error,datafound) =>{
            if(error) res.status(500).send({message:error})
            console.log(datafound);
            res.status(200).send({data:datafound});
        }).skip(skip)
        .limit(PAGE_SIZE);   
    }


module.exports= {
    Create,
    Read,
    Update,
    Delete,
    ReadbyId,
    GetMemorialsByType,
    FindDataFromSearchButton
};