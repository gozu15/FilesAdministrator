'use strict'
module.exports = (app, multi,rutaProtegida) => {    
    const express = require('express');
    const router = express.Router();
    const controllerDocument = require('../Controllers/getDocument');

    router.post('/create',controllerDocument.CreateDataDocument)
    
    router.put('/update/:id',controllerDocument.updateDataDocument);
    router.post('/upload', multi, controllerDocument.RequestDocument)
    router.get('/read',controllerDocument.ReadDocumentToRelationship)
    //RUTA DE USO DE MODULO MAMMOTH
    router.get('/check',controllerDocument.ReadDocument);
    //RUTA DE USO DE MODULO TEXTTRACT
    //router.get('/check-prod',controllerDocument.TexttractModuleRead);
    //RUTA DE USO DE MODULO PDF-PARSE
    router.get('/pdfcheck',controllerDocument.ReadPdfDocument);

    router.get('/mdcheck',controllerDocument.ReadMarkdownFile);

        
    router.post('/takeImage/:name',controllerDocument.OCRGoogleAPI);
    app.use('/api/documents', router);

}