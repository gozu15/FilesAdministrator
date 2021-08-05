'use strict'
module.exports = (app, multi,rutaProtegida) => {    
    const express = require('express');
    const router = express.Router();
    const controllerLawsandRegulations = require('../Controllers/lawsandregulationslibrary');

    router.get('/library_get',controllerLawsandRegulations.GetLibraryBooksAll);
    router.get('/getpdf/:name',controllerLawsandRegulations.GetPDFFile);
    router.post('/uploadpdf',multi,controllerLawsandRegulations.UploadPDFFile);
    router.post('/create/library',controllerLawsandRegulations.CreateLibrary);
    router.delete('/delete/:id',controllerLawsandRegulations.DeleteLibraryBook);
    router.put('/update/:id',controllerLawsandRegulations.UpdateLibraryBook);
    app.use('/api/lawsandregulations', router);

}