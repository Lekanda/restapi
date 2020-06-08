const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    limits : { fileSize : 100000 },

    storage: fileStorage = multer.diskStorage({// Donde se guarda
        destination: (req,file, cb) => {
            console.log(__dirname+'../../uploads/');
            
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
    // console.log(req.body);
    // console.log(req.file);
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


// Muestra el producto x 