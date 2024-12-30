const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;

const dbURI = "mongodb://root:toor@localhost:27017/multimedia?authSource=admin"; // Database URI

mongoose.connect(dbURI) // Database and options
.then(() => {
    console.log('Conexión exitosa a MongoDB'); // If connection is established
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err); // Error if connection failed
  });;
