'use strict'
module.exports = (app, multi,rutaProtegida) => {    
    const express = require('express');
    const router = express.Router();
    const controllerDocument = require('../Controllers/getDocument');

    router.post('/create',controllerDocument.CreateDataDocument)

    router.get('/',controllerDocument.GetDocument);
    router.post('/upload', multi, controllerDocument.RequestDocument)
    //RUTA DE USO DE MODULO MAMMOTH
    router.get('/check',controllerDocument.ReadDocument);
    //RUTA DE USO DE MODULO TEXTTRACT
    router.get('/check-prod',controllerDocument.TexttractModuleRead);
    //RUTA DE USO DE MODULO PDF-PARSE
    router.get('/pdfcheck',controllerDocument.ReadPdfDocument);

    //HELLO WORLD EXAMPLE
    router.post('/hello-create',controllerDocument.Create);
    router.get('/hello-get',controllerDocument.Read);
    router.get('/hello-get/:id',controllerDocument.ReadbyID);
    router.put('/hello-update/:id',controllerDocument.Update);
    router.delete('/hello-delete/:id',controllerDocument.Delete);

    app.use('/api/documents', router);

}