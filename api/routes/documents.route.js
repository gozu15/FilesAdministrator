'use strict'
module.exports = (app, multi) => {
    const express = require('express');
    const router = express.Router();
    const controllerDocument = require('../Controllers/getDocument');

    router.post('/create',controllerDocument.CreateDataDocument)

    router.get('/', controllerDocument.GetDocument);
    router.post('/upload', multi, controllerDocument.RequestDocument)
    router.get('/check',controllerDocument.ReadDocument);

    app.use('/api/documents', router);

}