const express = require('express');

const router = express.Router();

const PrefController = require('../controller/classification.controller');

const prefController = new PrefController();

router.get('/data', prefController.getAllData);
router.post('/data', prefController.createData);
router.get('/data/:id', prefController.getDataById);
router.put('/data/:id', prefController.updateData);
router.delete('/data/:id', prefController.removeData);

module.exports = router;