const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const upload = multer({ storage });

router.get("/", productsController.catalogo)

router.get("/detail/:id", productsController.productDetail)

router.get("/create", productsController.create)
router.post('/create', upload.single("imageProduct"), productsController.store); 

router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.single("imageProductEdit"), productsController.update); 

router.delete("/delete/:id", productsController.destroy)

module.exports = router;