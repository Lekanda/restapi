const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    limits : { fileSize : 100000 },

    storage: fileStorage = multer.diskStorage({// Donde se guarda
        destination: (req,file, cb) => {
            // console.log(__dirname+'../../uploads/');
            
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {// Nombre del archivo
            const extension = file.mimetype.split('/')[1];// separa nombre y extension. Interesa en esta caso la extension[1]
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),

    fileFilter(req,file,cb) {
        if (file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // El formato de imagen es valido
            cb(null, true);
        }else{
            // El Formato de imagen no es valido
            cb(new Error('Formato no valido'));
        }
    }
}


// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req,res,next) => {
    upload(req,res, function(error) {
        if(error) {
            res.json({mensaje:error});
        }
        next();
    })
}


exports.nuevoProducto = async(req,res,next) => {
    console.log(req.body);// Datos string y text
    console.log(req.file);// archivo de imagen
    const producto = new Productos(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({ mensaje:'Nuevo producto creado' });
    } catch (error) {
        console.log(error);
        res.json({ mensaje:'No se creo el producto' });
        next();
    }
}


// Muestra todos los productos
exports.mostrarProductos = async (req,res,next) => {
    try {
        const productos = await Productos.find({});
        res.json({mensaje:'Lista de Productos', productos});
    } catch (error) {
        console.log(error);
        next();
    }
}


// Muestra el producto x ID
exports.mostrarProducto = async (req,res,next) => {
    try {
        const producto = await Productos.findById({_id:req.params.id});
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.json({ mensaje:'No existe el producto' });
        next();
    }
}


// Actualiza un producto por ID
exports.actualizarProducto = async(req,res,next) => {
    try {
        let nuevoProducto = req.body;

        // Verificar sí hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await Productos.findById(req.params.id);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        const producto = await Productos.findOneAndUpdate({ _id : req.params.id }, 
            nuevoProducto, {
                new : true// trae el modificado
            });
        res.json(producto);

    } catch (error) {
        res.json({ mensaje:'No existe ese producto'});
        console.log(error);
        next();
    }
}



// // Elimina el producto x ID
exports.eliminarProducto = async(req,res,next) => {
    try {
        const producto = await Productos.findOneAndDelete({ _id:req.params.id });
        // console.log(producto.imagen);
        // console.log(__dirname + `/../uploads/${producto.imagen}`);
        if(producto.imagen){
            const imagenAnterioPath = __dirname + `/../uploads/${producto.imagen}`;
            // Eliminar archivo con filesystem
            fs.unlink( imagenAnterioPath, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            });
        }
        res.json({ producto, mensaje:'Producto Eliminado'});

    }catch(error){
        res.json({ mensaje:'No existe ese Producto'});
        console.log(error);
        next();
    }
}


// Busca Producto
exports.buscarProducto = async ( req, res, next) => {
    try {
        // Obtener el query
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i')});
        res.json(producto);
    } catch (error) {
        console.log(error);    
        next();
    }
}