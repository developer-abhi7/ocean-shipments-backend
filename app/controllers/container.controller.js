const Container = require('../models').Container;
const Shipment = require('../models').Shipment;

module.exports = {
  list(req, res) {
    return Container
      .findAll({
        include: [{
          model: Shipment,
          as: 'shipments'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Shipment, as: 'shipments' }, 'createdAt', 'DESC'],
        ],
      })
      .then((containers) => res.status(200).send(containers))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Container
      .findById(req.params.id, {
        include: [{
          model: Shipment,
          as: 'shipments'
        }],
      })
      .then((container) => {
        if (!container) {
          return res.status(404).send({
            message: 'container Not Found',
          });
        }
        return res.status(200).send(container);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    console.log(req.body);
    return Container
      .create({
        status: req.body.status,
        volume_limit: req.body.volume_limit,
        weight_limit: req.body.weight_limit,
        volume_filled: req.body.volume_filled,
        weight_filled: req.body.weight_filled
      })
      .then((container) => res.status(201).send(container))
      .catch((error) => res.status(400).send(error));
  },

  addWithShipments(req, res) {
    return Container
      .create({
        status: req.body.status,
        volume_limit: req.body.volume_limit,
        weight_limit: req.body.weight_limit,
        volume_filled: req.body.volume_filled,
        weight_filled: req.body.weight_filled,
        shipment_id: req.body.shipments
      }, {
      	include: [{
          model: Shipment,
          as: 'shipments'
        }]
      })
      .then((container) => res.status(201).send(container))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Container
      .findById(req.params.id, {
        include: [{
          model: Shipment,
          as: 'shipments'
        }],
      })
      .then(container => {
        if (!container) {
          return res.status(404).send({
            message: 'container Not Found',
          });
        }
        return container
          .update({
            status: req.body.status || container.status,
            volume_limit: req.body.volume_limit || container.volume_limit,
            weight_limit: req.body.weight_limit || container.weight_limit,
            volume_filled: req.body.volume_filled || container.volume_filled,
            weight_filled: req.body.weight_filled || container.weight_filled
          })
          .then(() => res.status(200).send(container))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Container
      .findById(req.params.id)
      .then(container => {
        if (!container) {
          return res.status(400).send({
            message: 'container Not Found',
          });
        }
        return container
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
