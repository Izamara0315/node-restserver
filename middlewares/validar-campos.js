const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) =>  {  
 

    const errors = validationResult(req);  // validar
   if (! errors.isEmpty() ) {              // validar
      return res.status(400).json(errors);  // validar
    }
next();// realiza el next y va a el check de usuarios.js routes

 }
module.exports=  {  
    validarCampos
 }
