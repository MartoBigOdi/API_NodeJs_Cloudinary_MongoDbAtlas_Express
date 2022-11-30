import Product from '../models/product.model.js'
import {uploadingImage, deleteImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'


//Get de los productos guardados en la base
export const getProducts = async (req,res) => {
    try{
        const products =  await Product.find()
        console.log("Productos guardados al momento: ".magenta + products)
        res.json(products);

    } catch (error){
        res.status(400).json({
            message: "Sucedio un problema con la peticion GET de productos"
        })
    }
};


//Get un solo producto
export const getOneProduct = async (req, res) => {
    try{
        const producto = await Product.findById(req.params.id)
        console.log(req.params) //Con params odemos ver la url
        
        if(!producto){
            return res.status(404).json({
                message:"El producto no existe"
            })
        }
        return res.send(producto)

    } catch (error){
        console.log("Algo salio mal: " + error)
        res.json("Error al buscar el producto: " + error)
    }  
}


//Creamos un producto y lo guardamos POST
export const createProducts = async (req,res) =>  {
    try{
        const {name, description, price} = req.body;

        //Instanciamos el producto con lo que nos llega desde el req.body
        const product = new Product({
            name,
            description,
            price
        })
        //Le decimos que si el files que nos permite manejar el modulo express-fileupload tiene una image la subimos a Cloudinary
        if(req.files?.image){
        //guardamos el result de la subida de imagenes, Imagen que guardamos en la nube
        const result = await uploadingImage(req.files.image.tempFilePath)
        product.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
        } 
        console.log(result)
        }
        //Podemos utilozar await gracias al modulo fs-extra que lo permite
        await fs.unlink(req.files.image.tempFilePath)

        //Guardamos el product en Mongo Db Atlas en nuestro Cluster de la Nube
        await product.save()
            console.log("Se guardo el producto: " + name, description, price)
            res.json('Product guardado: ' + product)
            //Manera distinta de manejar el error
    } catch (error){
        console.log("El producto ya esta en la base, no se puede ingresar".bold.bgMagenta)
        res.json({
            message:"Ya esta ingresado el producto"
        })
    }
};


//Delete un pproducto por ID
export const deleteProducts = async (req,res) => {
    try{
        const producto = await Product.findById(req.params.id)
        console.log(req.params) //Con params odemos ver la url
        await Product.findByIdAndDelete(producto)

        //Manera distinta de manejar el error, en el create lo enviamos con el catch.
        if(!producto){
            return res.status(404).json({
                message:"El producto no existe"
            })
        }

        //Borramos de la nuba la img con su public_id
        await deleteImage(producto.image.public_id)

        res.send(producto)
        console.log("Borramos el producto")
    } catch (error){
        console.log("Algo salio mal: " + error)
        
    }    
};


//PUT un producto
export const updateProducts = async (req,res) =>  {
    try{
        const {id} = req.params;

        //Porque ya tomamos el id del req.params antes
        const productoActulizado = await Product.findByIdAndUpdate(id, req.body)
        console.log(id)
        console.log(req.body)
        console.log(productoActulizado)
        return res.json(productoActulizado)

    } catch (error) {
        console.log("Algo salio mal: " + error)
        res.json("Error al actualizar producto: " + error)
    } 
}
