var express = require('express');
var router = express.Router();

const noteController = require('../controllers').note_ctrl;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


/* Note Router */
router.get('/api/note', noteController.list);
router.get('/api/note/:id', noteController.getById);
router.post('/api/note', noteController.add);
router.put('/api/note/:id', noteController.update);
router.delete('/api/note/:id', noteController.delete);

module.exports = router;