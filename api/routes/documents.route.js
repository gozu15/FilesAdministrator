'use strict'
module.exports = (app, multi,rutaProtegida) => {    
    const express = require('express');
    const router = express.Router();
    const controllerDocument = require('../Controllers/getDocument');

    router.post('/create',controllerDocument.CreateDataDocument)

    router.get('/',controllerDocument.GetDocument);
    router.post('/upload', multi, controllerDocument.RequestDocument)
    router.get('/check',controllerDocument.ReadDocument);
    router.get('/pdfcheck',controllerDocument.ReadPdfDocument);

    //HELLO WORLD EXAMPLE
    router.post('/hello-create',controllerDocument.Create);
    router.get('/hello-get',controllerDocument.Read);
    router.get('/hello-get/:id',controllerDocument.ReadbyID);
    router.put('/hello-update/:id',controllerDocument.Update);
    router.delete('/hello-delete/:id',controllerDocument.Delete);

    app.use('/api/documents', router);

}