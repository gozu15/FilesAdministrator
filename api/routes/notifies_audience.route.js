'use strict'
module.exports = (app, multi,rutaProtegida) => {    
    const express = require('express');
    const router = express.Router();
    const CONTROLLER_NOTIFIES = require('../Controllers/notifies_audience.controller');

    router.get('/notify',CONTROLLER_NOTIFIES.GetAllandNotDelete);
    router.get('/notify/get/inprocess',CONTROLLER_NOTIFIES.GetAllInProcessNotDelete)
    router.get('/notify/:name',CONTROLLER_NOTIFIES.GetAllandNotDeleteById);
    
    router.post('/create',CONTROLLER_NOTIFIES.Create);
    router.delete('/delete/:id',CONTROLLER_NOTIFIES.Delete);
    router.put('/update/:id',CONTROLLER_NOTIFIES.Update);
    app.use('/api/notify_audience', router);

}