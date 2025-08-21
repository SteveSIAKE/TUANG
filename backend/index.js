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

import userRoutes from "./routes/user.routes.js";
app.use("/api/user", userRoutes);
