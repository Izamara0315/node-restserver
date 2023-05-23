const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async(req = require, res = response) =>  {

    //const  { q, nombre = 'No name', apikey, page = '1', limit  } = req.query;
    
    const { limite = 5, desde = 0  } = req.query;
    const query = {  estado: true };//solo mostrara el estado en true los false no


    //const usuario = await Usuario.find( query )//solo mostrara el estado en true los false no
    //.skip(Number(desde))
    //.limit(Number(limite));

    //const total = await Usuario.countDocuments(   query );

    const [total, usuarios ] = await Promise.all([
      Usuario.count(query),
      Usuario.find(query)
        .skip(Number( desde ))
        .limit(Number( limite))
     ]);


    res.json({  
      
      total,
       usuarios
    });
  }


  const usuariosPost = async (req, res = response) =>  {

   


    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});


    //Verificar si el correo existe
    //const existeEmail = await Usuario.findOne ( {correo  } );  // correo
   // if (existeEmail) {  
    //  return res.status(400).json({  
      //   msg: 'Ese correo ya esta registrado '

     //  });                                            // correo


     



    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar la contraseña


   //Guardar en base de datos
    await usuario.save();


    res.json({  
       msg: 'Post - controlador',
       usuario
    });
  }


  const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}





  const usuariosPatch = (req, res = response) =>  {
    
    res.json({  
       msg: 'Patch Api - controlador'
    });
  }


  const usuariosDelete = async (req, res = response) =>  {


    const  { id   } = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id ); //para eliminar

    const usuario = await Usuario.findByIdAndUpdate( id,  {estado: false } );
    
    res.json( usuario);
  }


  module.exports =  {  
usuariosGet,
usuariosPatch,
usuariosPut,
usuariosPost,
usuariosDelete

   }