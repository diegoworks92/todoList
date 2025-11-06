const express = require("express");
const config = require("./config/config");
const todoRoutes = require("./routes/todo.routes");
const { notFound } = require("./middlewares/error.middleware");
const cors = require("cors");

const api = express();
// cors para conectar con la ruta del front
api.use(cors({ origin: "http://localhost:5173" }));


// middleware config  
api.use(express.json());
api.use("/api/v1", todoRoutes);
api.use(notFound);


api.listen(config.api_port, () => {
    console.log(`===========================================`)
    console.log(`Servidor corriendo en puerto ${config.api_port}`)
    console.log(`URL http://localhost:${config.api_port}`)
    console.log(`===========================================`)
});