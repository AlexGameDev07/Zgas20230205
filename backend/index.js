//* Import the app.js file
import app from './app.js';
import {config} from './src/config.js';
// Import the database.js file
import "./database.js";

//*Create a sever function
async function main(){
    const PORT = config.PORT;
    app.listen(PORT);
    console.log(`Si furuló el server jaja salu2`);
}

//*Execute the main function
main();