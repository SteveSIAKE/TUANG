# TUANG - Application de Réservation de Billets de Train

## 📋 Description du Projet

TUANG est une application web moderne permettant aux utilisateurs de réserver des billets de train en ligne. L'application offre une interface utilisateur intuitive et un système de gestion des réservations robuste.

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
- **Framework** : Express.js
- **Base de données** : MongoDB avec Mongoose
- **Authentification** : JWT (JSON Web Tokens)
- **Sécurité** : bcrypt pour le hachage des mots de passe
- **CORS** : Configuration pour les requêtes cross-origin

### Frontend (React + Vite)
- **Framework** : React 18
- **Build Tool** : Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM
- **UI/UX** : Interface moderne et responsive

## 🚀 Fonctionnalités

### Fonctionnalités Utilisateur
- ✅ Inscription et connexion des utilisateurs
- ✅ Gestion des profils utilisateurs
- 🔄 Recherche de trains disponibles
- 🔄 Réservation de billets
- 🔄 Gestion des réservations (annulation, modification)
- 🔄 Historique des réservations
- 🔄 Système de paiement

### Fonctionnalités Administrateur
- 🔄 Gestion des trains
- 🔄 Gestion des utilisateurs
- 🔄 Tableau de bord analytique
- 🔄 Gestion des réservations

## 📊 Modèles de Données

### Utilisateur (User)
- Nom, email, mot de passe
- Rôle (admin/user)
- Informations personnelles (sexe, date de naissance, téléphone)
- Photo de profil

### Train
- Nom et description du train
- Horaires et trajets
- Capacité et classes disponibles

### Réservation (Reservation)
- Utilisateur et train associés
- Dates de départ et retour
- Classe (économique, première, business)
- Prix et nombre de passagers
- Statut (en attente, confirmée, annulée)

## 🎯 Sprints de Développement

### Sprint 1 : Fondations (Semaine 1-2)
**Objectifs :**
- ✅ Configuration de l'environnement de développement
- ✅ Mise en place de l'architecture backend
- ✅ Création des modèles de données
- ✅ Implémentation de l'authentification
- ✅ Configuration du frontend React
- ✅ Pages de connexion et d'inscription

**Livrables :**
- Backend fonctionnel avec authentification
- Frontend avec pages de connexion/inscription
- Base de données configurée

### Sprint 2 : Gestion des Trains (Semaine 3-4)
**Objectifs :**
- 🔄 Interface d'administration pour la gestion des trains
- 🔄 API pour la recherche de trains
- 🔄 Affichage des trains disponibles
- 🔄 Filtres de recherche (date, destination, classe)

**Livrables :**
- CRUD complet pour les trains
- Interface de recherche de trains
- API de recherche avec filtres

### Sprint 3 : Système de Réservation (Semaine 5-6)
**Objectifs :**
- 🔄 Interface de réservation
- 🔄 Calcul automatique des prix
- 🔄 Gestion des classes de voyage
- 🔄 Validation des disponibilités

**Livrables :**
- Système de réservation complet
- Calcul des prix selon les classes
- Validation des disponibilités

### Sprint 4 : Gestion des Réservations (Semaine 7-8)
**Objectifs :**
- 🔄 Tableau de bord utilisateur
- 🔄 Historique des réservations
- 🔄 Annulation et modification de réservations
- 🔄 Notifications par email

**Livrables :**
- Interface de gestion des réservations
- Système de notifications
- Historique complet

### Sprint 5 : Paiement et Sécurité (Semaine 9-10)
**Objectifs :**
- 🔄 Intégration d'un système de paiement
- 🔄 Sécurisation des données
- 🔄 Validation des formulaires
- 🔄 Gestion des erreurs

**Livrables :**
- Système de paiement sécurisé
- Validation complète des données
- Gestion d'erreurs robuste

### Sprint 6 : Optimisation et Tests (Semaine 11-12)
**Objectifs :**
- 🔄 Tests unitaires et d'intégration
- 🔄 Optimisation des performances
- 🔄 Interface responsive
- 🔄 Documentation API

**Livrables :**
- Tests automatisés
- Application optimisée
- Documentation complète

### Sprint 7 : Déploiement et Finalisation (Semaine 13-14)
**Objectifs :**
- 🔄 Déploiement en production
- 🔄 Configuration des environnements
- 🔄 Monitoring et logs
- 🔄 Formation utilisateurs

**Livrables :**
- Application déployée en production
- Monitoring configuré
- Documentation utilisateur

## 🛠️ Installation et Configuration

### Prérequis
- Node.js (v18+)
- MongoDB
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm run server
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Structure du Projet

```
TUANG/
├── backend/
│   ├── config/          # Configuration base de données
│   ├── controllers/     # Logique métier
│   ├── middlewares/     # Middlewares (auth, validation)
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Routes API
│   └── index.js         # Point d'entrée
├── frontend/
│   ├── public/          # Assets statiques
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   └── assets/      # Ressources
│   └── package.json
└── README.md
```

## 🔧 Technologies Utilisées

### Backend
- **Express.js** : Framework web
- **MongoDB** : Base de données NoSQL
- **Mongoose** : ODM pour MongoDB
- **JWT** : Authentification
- **bcrypt** : Hachage des mots de passe
- **CORS** : Gestion des requêtes cross-origin

### Frontend
- **React 18** : Framework UI
- **Vite** : Build tool
- **Tailwind CSS** : Framework CSS
- **React Router** : Navigation
- **Axios** : Client HTTP

## 📈 État d'Avancement

- ✅ **Sprint 1** : Terminé (Fondations)
- 🔄 **Sprint 2** : En cours (Gestion des trains)
- ⏳ **Sprint 3-7** : À venir

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**TUANG** - Votre compagnon de voyage ferroviaire 🚂
