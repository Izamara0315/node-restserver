
const { Router  } = require('express');

const { usuariosGet, usuariosPatch, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);



  router.patch('/', usuariosPatch);

  router.put('/:id', usuariosPut);

  router.post('/', usuariosPost);

  router.delete('/', usuariosDelete);


  



  module.exports = router;