const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require('path');

const apiRoutes = 
//Configuraciones
app.set("port",3000);
app.set("json spaces",2)
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/",require("./routes/apiRoutes"))
app.use("/",require("./routes/basicRoutes"))
//Server
app.listen(app.get("port"));

