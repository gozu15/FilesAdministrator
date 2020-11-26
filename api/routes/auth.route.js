'use strict'
module.exports=(app,jwt)=>{
    const express = require('express');
    const router = express.Router();    
    const userModel = require ('../Models/users.model')
    
    router.post('/login',(req,res)=>{
        let body =req.body;
         if(body.user == "angel" && body.password == "angel123"){
        const payload = { check:  true };
        const token = jwt.sign(payload, app.get('llave'), {expiresIn: 1440});  
        res.status(200).send({
        mensaje: 'Autenticación correcta',
        token: token
        });
    } else {
        res.status(500).send({ mensaje: "Usuario o contraseña incorrectos"})
    }
    });

    app.use('/api/authentication',router);
    
}
