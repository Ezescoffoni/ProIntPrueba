const mainRoutes = require('./src/routes/mainRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const express = require ("express");
const path = require ("path");
const app = express ();
const methodOverride = require('method-override');


const publicPath = path.resolve (__dirname, "./public" );

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use("/", mainRoutes);
app.use("/users", userRoutes);
app.use("/products", productsRoutes);

//console.log(publicPath)

app.use (express.static (publicPath));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3100, () => {
    console.log("***   Servidor corriendo de forma exitosa en el puerto 3100   ***")
})


