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
          [{ model: Student, as: 'students' }, 'createdAt', 'DESC'],
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
    return Container
      .create({
        class_name: req.body.class_name,
      })
      .then((container) => res.status(201).send(container))
      .catch((error) => res.status(400).send(error));
  },

  addWithStudents(req, res) {
    return Container
      .create({
        class_name: req.body.class_name,
        students: req.body.students,
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
            class_name: req.body.class_name || container.class_name,
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
