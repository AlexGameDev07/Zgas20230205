//* Import the app.js file
import app from './app.js';

//*Create a sever function
async function main(){
    const PORT = 4000;
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
}

//*Execute the main function
main();