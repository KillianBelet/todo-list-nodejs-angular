const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Déclaration de dotenv afin que le script aille chercher les variables d'environnement
require("dotenv").config();

//Middleware qui gère la vérification que l'utilisateur est bien authentifié
const requireAuth = require('./middleware/auth.middleware');


const postRoutes = require('./routes/post.routes');
const tagueRoutes = require('./routes/tague.routes');
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');

//const errorHandler = require('./middlewares/error.middleware');
const connectDB = require("./config/db");
const port = 5000;

//Connexion à la DB MongoDB
connectDB();






const app = express();
app.use(cors({ origin:'http://localhost:4200', credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//Déclaration des differentes routes de mon API
app.use("/auth", authRoutes);
app.use("/tague",requireAuth, tagueRoutes);
app.use("/task",requireAuth, taskRoutes);




//lancer le serveur
app.listen(port, () => console.log("Le serveur express est en route ! Sur le port " + port));
