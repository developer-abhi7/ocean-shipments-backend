const Note = require('../models').Note;

module.exports = {

list(req,res){
    return Note.findAll({})
    .then((notes) => res.status(200).send(notes))
    .catch((error) =>{res.status(400).send(error);});
},

getById(req, res) {
    return Note
      .findById(req.params.id,{})
      .then((note) => {
        if (!note) {
          return res.status(404).send({
            message: 'Note Not Found',
          });
        }
        return res.status(200).send(note);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Note
      .create({
        title: req.body.title,
        content: req.body.content,
      })
      .then((note) => res.status(201).send(note))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Note
      .findById(req.params.id, {})
      .then(note => {
        if (!note) {
          return res.status(404).send({
            message: 'note Not Found',
          });
        }
        return note
          .update({
            title: req.body.title || note.title,
            content: req.body.content || note.content
          })
          .then(() => res.status(200).send(note))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Note
      .findById(req.params.id)
      .then(note => {
        if (!note) {
          return res.status(400).send({
            message: 'note Not Found',
          });
        }
        return note
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};


