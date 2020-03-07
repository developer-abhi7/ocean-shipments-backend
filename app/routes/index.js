var express = require('express');
var router = express.Router();

const noteController = require('../controllers').note_ctrl;
const containerController = require('../controllers').container_ctrl;
const shipmentController = require('../controllers').shipment_ctrl;

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


/* container Router */
router.get('/api/container', containerController.list);
router.get('/api/container/:id', containerController.getById);
router.post('/api/container', containerController.add);
router.put('/api/container/:id', containerController.update);
router.delete('/api/container/:id', containerController.delete);

/* shipment Router */
router.get('/api/shipment', shipmentController.list);
router.get('/api/shipment/:id', shipmentController.getById);
router.post('/api/shipment', shipmentController.add);
router.put('/api/shipment/:id', shipmentController.update);
router.delete('/api/shipment/:id', shipmentController.delete);

router.post('/api/container/add_with_shipments', containerController.addWithShipments);


module.exports = router;