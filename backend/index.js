// // point d'entrée du serveur
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Connexion à MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connecté à MongoDB'))
// .catch((err) => console.error('Erreur de connexion à MongoDB de styvo :', err));

// // Route de test
// app.get('/', (req, res) => {
//   res.send('Bienvenue sur le backend de réservation de billets de train !');
// });

// // Lancement du serveur
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Serveur démarré sur le port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur de connexion à MongoDB :', err));

app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de réservation de billets de train !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

//
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
