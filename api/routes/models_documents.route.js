'use strict'
module.exports = (app, multi,rutaProtegida) => {    
     const express = require('express');
    const router = express.Router();
    const controllerModel = require('../Controllers/models.controller');

    router.get('/',controllerModel.find);
    router.post('/create',controllerModel.create)

    app.use('/api/models_documents',router);

}