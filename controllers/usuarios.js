const  { response, request  } = require('express');



const usuariosGet = (req = require, res = response) =>  {

    const  { q, nombre = 'No name', apikey, page = '1', limit  } = req.query;
    
    res.json({  
       msg: 'get Api - controlador',
       q,
       nombre,
       apikey,
       page,
       limit
    });
  }


  const usuariosPost = (req, res = response) =>  {

    const {  nombre, edad } = req.body;

    
    res.json({  
       msg: 'Post - controlador',
       nombre,
       edad
    });
  }


  const usuariosPut = (req, res = response) =>  {

    const { id } = req.params;
    
    res.json({  
       msg: 'Put Api - controlador',
       id
    });
  }



  const usuariosPatch = (req, res = response) =>  {
    
    res.json({  
       msg: 'Patch Api - controlador'
    });
  }


  const usuariosDelete = (req, res = response) =>  {
    
    res.json({  
       msg: 'Delete Api - controlador'
    });
  }


  module.exports =  {  
usuariosGet,
usuariosPatch,
usuariosPut,
usuariosPost,
usuariosDelete

   }