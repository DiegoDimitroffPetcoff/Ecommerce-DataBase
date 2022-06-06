const express = require('express');
const app = express();
const carritosRouter = require('./src/routes/carritoRoute.js');
const productosRouter = require('./src/routes/productosRoute')


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine", 'ejs');
app.set("views", __dirname + '/views');
app.use(express.static("public"));



app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);


  




app.listen(8080, () => {
    console.log('Server on port 8080');
})
app.on("Error", (error) => console.log("error en servidor ${error}"));

