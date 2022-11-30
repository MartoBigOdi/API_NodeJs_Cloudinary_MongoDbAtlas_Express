import {Router} from 'express';
import {getProducts, createProducts, updateProducts, deleteProducts, getOneProduct} from '../controllers/products.controllers.js'
const router = Router();


//Rutas
router.get('/products', getProducts)

router.get('/products/:id', getOneProduct)

router.post('/products',  createProducts)

router.put('/products/:id',  updateProducts)

router.delete('/products/:id', deleteProducts)



export default router;
