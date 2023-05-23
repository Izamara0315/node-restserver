

const { Router  } = require('express');

const { usuariosGet, usuariosPatch, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');




const router = Router();


router.get('/', usuariosGet);



  router.patch('/', usuariosPatch);

 
  router.put('/:id',[ 
    check ('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
  ],usuariosPut);


  router.post('/', [ 
    check(  'nombre',  'El nombre es obligatorio').not().isEmpty(), // nombre
    check(  'password',  'El password debe ser de más de 6 letras').isLength({  min: 6 }  ), // contraseña
    check(  'correo').custom( emailExiste), // correo
    // check(  'rol',  'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE' ]), // 
    check ('rol').custom( esRoleValido ),
    validarCampos


 ],  usuariosPost);

  router.delete('/:id', [ 
    check ('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

  ],
  
  
  usuariosDelete);


  



  module.exports = router;