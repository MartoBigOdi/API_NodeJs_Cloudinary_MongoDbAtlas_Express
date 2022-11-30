
import app from './app.js'
import {connectDB} from './utils/mongoose.js';
import color from 'colors';


//Ordenamos mejor el codigo
async function main() {
    //Config
    await connectDB();
    //Port
    app.listen(3000);
    console.log('Server is running on port '.rainbow.bold,3000);
}

main();
