const express = require('express');
const router = express.Router();

let users = [
  { id: 1, nombre: "pedro", email: "pedro@mail.com" },
  { id: 2, nombre: "juan", email: "juan@mail.com" },
  { id: 3, nombre: "carlos", email: "carlos@mail.com" },
  { id: 4, nombre: "maria", email: "maria@mail.com" }
];

router.get('/', function(req, res) {
  return res.json(users)
});

router.post('/', function (req, res) {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({
      error: 'nombre y email son obligatorios'
    });
  }

  if (!email.includes('@')) {
    return res.status(400).json({
      error: 'email no es válido'
    });
  }

  return res.status(201).json({
    message: 'usuario creado correctamente',
    user: {
      nombre,
      email
    }
  });
});

router.get(`/:id`, function(req, res){
    const id = req.params.id;

    const user = users.find(u => u.id == id);

  if (!user) {
    return res.status(404).json({
      message: "no se encontró el usuario"
    });
  }

  return res.status(200).json(user);

});

module.exports = router;