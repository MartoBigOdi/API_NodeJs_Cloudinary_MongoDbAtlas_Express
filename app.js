import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index.routes.js';
import productsRoutes from './routes/products.routes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';

//Config
const app = express();
app.use(cors()); //permite conectar un servidor con otro
app.use(morgan('dev')); //Mostramos las consultas por consola
app.use(express.json()); //Nos permite recibir Json en el servidor
app.use(fileUpload({ //Este modulo que usa app nos permite que express reciba archivos
    useTempFiles : true,
    tempFileDir : './uploads'
})); //Esto tambien lo podemos pasar al controlador de la ruta, le podemos decir que pasamos primero la funcion y desp el controlador para la vista, esto exoress lo permite

//Vamos organizando los distintos router que recibimos de los archivos ".routes.js"
app.use(indexRoutes,productsRoutes);

export default app;

