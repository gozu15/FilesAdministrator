'use strict'
module.exports = (app, multi,rutaProtegida) => {    
    const express = require('express');
    const router = express.Router();
    const controllerDiarybook = require('../Controllers/diary_books.controller');

    router.post('/create',controllerDiarybook.createDiarybook);
    router.get('/',controllerDiarybook.findDiarybook);    
    router.get('/:id',controllerDiarybook.findbyIdDiarybook);
    router.get('/complete/:id',controllerDiarybook.findDiaryBookbyIdComplete);   
    router.get('/complete/get/full',controllerDiarybook.findDiaryBookComplete);

    router.put('/update/:id',controllerDiarybook.updateDiarybook);

    //add description to book

    router.post('/description/add/:idbook',controllerDiarybook.addnewDocumentToBook);
    router.put('/description/update/:id',controllerDiarybook.updateContentDiarySelected)
    router.delete('/description/delete/:id',controllerDiarybook.deleteContentFromDiaryBook)
    router.delete('/delete/:id',controllerDiarybook.deleteDiaryBook)
    
    app.use('/api/diary_books',router);
}