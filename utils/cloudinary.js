//Nombramos v2 como cloudinary para utilizar luego
import {v2 as cloudinary} from 'cloudinary';

//Config para conexion con Cloudinary
cloudinary.config({
    cloud_name:'dwq2iyrjs',
    api_key:'313182681484845',
    api_secret:'aZglmmhpAvgNF7oWbYfCiUWpmzY',
    secure: true
})


//Hacemos una funcion para subir a Cloudinary la img
export async function uploadingImage(filePath){ //El filePath va a ser donde esta la img
   return await cloudinary.uploader.upload(filePath, {
    folder: 'Template ecommerce'
   })
}


//Hacemos una funcion para eliminar la img de cloudinary
export async function deleteImage(public_id){ //Le pasamos el public Id de la img
  return await cloudinary.uploader.destroy(public_id)
 }
