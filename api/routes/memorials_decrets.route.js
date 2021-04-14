'use strict'
module.exports = (app,multi,rutaProtegida) =>{
     const express = require('express');
    const router = express.Router();
    const control_memorials_decrets = require('../Controllers/memorials_decretos.controller');    

     router.post('/create',control_memorials_decrets.Create);
    router.get('/',control_memorials_decrets.Read);    

    app.use('/api/memorials_decrets',router);
} 