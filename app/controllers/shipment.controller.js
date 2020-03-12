const Shipment = require('../models').Shipment;
const Container = require('../models').Container;

module.exports = {
  list(req, res) {
    return Shipment
      .findAll({
        include: [{
          model: Container,
          as: 'container'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Container, as: 'container' }, 'createdAt', 'DESC'],
        ],
      })
      .then((shipments) => res.status(200).send(shipments))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Shipment
      .findById(req.params.id, {
        include: [{
          model: Container,
          as: 'container'
        }],
      })
      .then((shipment) => {
        if (!shipment) {
          return res.status(404).send({
            message: 'Shipment Not Found',
          });
        }
        return res.status(200).send(shipment);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Shipment
      .create({
        weight: req.body.weight,
        volume: req.body.volume,
        container_id: req.body.container_id
      })
      .then((shipment) => res.status(201).send(shipment))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Shipment
      .findById(req.params.id, {
        include: [{
          model: Container,
          as: 'container'
        }],
      })
      .then(shipment => {
        if (!shipment) {
          return res.status(404).send({
            message: 'Shipment Not Found',
          });
        }
        return shipment
          .update({
            weight: req.body.weight || container.weight,
            volume: req.body.volume || container.volume
          })
          .then(() => res.status(200).send(shipment))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Shipment
      .findById(req.params.id)
      .then(shipment => {
        if (!shipment) {
          return res.status(400).send({
            message: 'Shipment Not Found',
          });
        }
        return shipment
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
