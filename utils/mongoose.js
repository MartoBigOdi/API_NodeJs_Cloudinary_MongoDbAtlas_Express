import mongoose from 'mongoose';
import color from 'colors';

//Podemos sumar dotenv y crear secret keys para poder hacerlo mas seguro pero no necesitamos en esta instancia del mvp
const MONGODB_URI = 'mongodb+srv://marto:martopassword@cluster0.g43jpjm.mongodb.net/?retryWrites=true&w=majority';

export async function connectDB(){ 
    try{
      await  mongoose.connect(MONGODB_URI);
      console.log("DB MONGO Conectada".bgCyan.bold)
    } catch (error){
        console.error("Algo salio mal con la conexion a la DB".bold + error);
    }
}




