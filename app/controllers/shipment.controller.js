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
          [{ model: Course, as: 'courses' }, 'createdAt', 'DESC'],
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
        classroom_id: req.body.classroom_id,
        student_name: req.body.student_name,
      })
      .then((shipment) => res.status(201).send(shipment))
      .catch((error) => res.status(400).send(error));
  },

  addCourse(req, res) {
    return Shipment
      .findById(req.body.student_id, {
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
      })
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
            student_name: req.body.student_name || container.student_name,
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
