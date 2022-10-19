const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, '../database/productsBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productoFilePath = path.join(__dirname, '../database/catalogoBase.json');
const productos = JSON.parse(fs.readFileSync(productoFilePath, 'utf-8'));

const productsController = {
	/*Detalle producto*/
    productDetail: function (req,res){
        let idProducto = req.params.id;
		let objProducto;

		for (let o of productos){
			if (idProducto == o.id){
				objProducto=o;
				break;
			}
		}
        res.render("products-detail", {producto: objProducto})
    },
	/*Catalogo productos*/
	catalogo: function (req,res){
        res.render("catalogo", {prod: productos});
    },
	/*Crear producto*/
    create: function (req,res){
        res.render("product-create")
    },
	store: function (req,res){
		
		idNuevo=0;
		for (let obje of products){
			if (idNuevo < obje.id){
				idNuevo = obje.id;
			}
		}

		idNuevo ++;

		let nombreImagen = req.file.filename;

		let productoNuevo = {
			id: idNuevo,
			name: req.body.name,
			description: req.body.description,
			price:	req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			image: nombreImagen
		}

		products.push(productoNuevo);

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect("/");
	},
	/*Editar producto*/
    edit: function (req,res){

        let idProducto = req.params.id;
		let objProducto;

		for (let o of productos){
			if (idProducto == o.id){
				objProducto=o;
				break;
			}
		}
		res.render('product-edit',{producto: objProducto})
    },
	update: (req, res) => {

		let idProducto = req.params.id;
		/*let nombreImagen = req.file.filename;*/

		for (let obj of products){
			if (idProducto==obj.id){
				
				obj.name = req.body.name;
				obj.description = req.body.description;
				obj.price =	req.body.price;
				obj.discount = req.body.discount;
				obj.category = req.body.category;
				if (req.file != undefined){
					fs.unlinkSync(path.join(__dirname, '../../public/images/', obj.image));
					obj.image = req.file.filename;
				}
				break;
				/*obj.image = nombreImagen;

				break;*/
			}
		}
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "));
		res.redirect("/");
	},
	destroy: (req, res) => {

		let idProducto = req.params.id;
		let productoEncontrado;

		let Nproducts = products.filter(function(e){
			return idProducto != e.id;
		})

		for (let producto of products){
			if (producto.id == idProducto){
				productoEncontrado = producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, "../../public/images", productoEncontrado.image));

		fs.writeFileSync(productsFilePath,JSON.stringify(Nproducts, null, " "));

		res.redirect("/");
	}

}

module.exports = productsController;