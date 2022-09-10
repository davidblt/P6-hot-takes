// Import des packages :
const express = require('express');
const mongoose = require('mongoose');

// Import du routeur :
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauces');

// création de l'application avec express :
const app = express();

// Connection à la base de données MongoDB :
mongoose
	.connect(
		'mongodb+srv://username:password@cluster0.fkis9u8.mongodb.net/?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

// intercepte toutes les requêtes qui ont un content-type json et met à disposition ce contenu sur l'objet req.body :
app.use(express.json());

/*_______________ CROSS ORIGIN RESSOURCES SHARING __________________
1er middleware qui gère le CORS avec les headers et sera appliqué à toutes les requêtes (donc pas de route en paramètre) */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});
/* _____________________________________________________________________ */


app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// On exporte l'application app.js pour la rendre accessible aux autres fichiers
module.exports = app;