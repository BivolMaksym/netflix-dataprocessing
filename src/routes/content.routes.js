const express = require('express');

const router = express.Router();

const ContentController = require('../controller/content.controller');

const contentController = new ContentController();

router.get('/data', contentController.getAllContent);
router.post('/data', contentController.addContent);
router.put('/data/:id', contentController.updateContent);
router.delete('/data', contentController.removeAllContent);

module.exports = router;