'use strict'
module.exports = (app, multi,rutaProtegida) => {    
    const express = require('express');
    const router = express.Router();
    const controllerDocument = require('../Controllers/getDocument');

    router.post('/create',controllerDocument.CreateDataDocument)
    router.delete('/delete/:id',controllerDocument.deleteDataDocument)
    router.put('/update/:id',controllerDocument.updateDataDocument);
    router.post('/upload', multi, controllerDocument.RequestDocument)
    router.get('/read',controllerDocument.ReadDocumentToRelationship)
    router.post('/search',controllerDocument.FindDataFromCoverInformationImage);
    //RUTA DE USO DE MODULO MAMMOTH
    router.get('/check',controllerDocument.ReadDocument);
    //GET IMAGE BY NAME
    router.get('/image/:name',controllerDocument.getImageByName);
    //router.get('/check-prod',controllerDocument.TexttractModuleRead);
    //RUTA DE USO DE MODULO PDF-PARSE
    router.get('/pdfcheck',controllerDocument.ReadPdfDocument);

    router.get('/mdcheck',controllerDocument.ReadMarkdownFile);

        
    router.post('/takeImage/:name',controllerDocument.OCRGoogleAPI);
    app.use('/api/documents', router);

}