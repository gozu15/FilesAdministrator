'use strict'
module.exports = (app,multi,rutaProtegida) =>{
     const express = require('express');
    const router = express.Router();
    const control_memorials_decrets = require('../Controllers/memorials_decretos.controller');    

     router.post('/create',control_memorials_decrets.Create);
    router.get('/read',control_memorials_decrets.Read);    
    router.get('/read/:id',control_memorials_decrets.ReadbyId);
    router.get('/read/typememorials/from',control_memorials_decrets.GetMemorialsByType);
    router.delete('/delete/:id',control_memorials_decrets.Delete);
    router.put('/update/:id',control_memorials_decrets.Update);

    app.use('/api/memorials_decrets',router);
} 