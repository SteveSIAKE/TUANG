# Cahier des charges – Projet TUANG

## 1. Présentation du projet

**Nom du projet :** TUANG  
**Objectif :** Développer une application web de réservation de trains, avec une interface utilisateur moderne (frontend) et une API sécurisée (backend).

---

## 2. Parties prenantes

- **Client/Product Owner :** [Nom à compléter]
- **Équipe de développement :** [Noms à compléter]
- **Utilisateurs finaux :** Voyageurs, administrateurs

---

## 3. Fonctionnalités principales

- Authentification des utilisateurs (inscription, connexion, gestion des rôles)
- Consultation des trains disponibles
- Réservation de billets de train
- Gestion des réservations (consultation, annulation)
- Interface d’administration (gestion des trains, des utilisateurs, des réservations)

---

## 4. Architecture technique

- **Frontend :** React + Tailwind CSS (Vite)
- **Backend :** Node.js + Express
- **Base de données :** [MongoDB]
- **Authentification :** JWT
- **Déploiement :** [Vercel]

---

## 5. Organisation en sprints

### Sprint 0 : Initialisation & préparation
- Mise en place du dépôt Git et des branches
- Définition de l’architecture du projet (dossiers, conventions)
- Rédaction du cahier des charges
- Installation des outils (Node, npm, Vite, etc.)

### Sprint 1 : Authentification & base utilisateur
- Création du modèle utilisateur (backend)
- Routes d’inscription et de connexion
- Middleware d’authentification
- Interface de connexion/inscription (frontend)
- Tests unitaires de l’authentification

### Sprint 2 : Gestion des trains
- Modélisation des trains (backend)
- Routes CRUD pour les trains (admin)
- Affichage des trains disponibles (frontend)
- Interface d’administration des trains

### Sprint 3 : Réservations
- Modélisation des réservations (backend)
- Routes pour réserver, consulter, annuler une réservation
- Interface utilisateur pour réserver un train
- Affichage des réservations de l’utilisateur

### Sprint 4 : Finalisation & tests
- Tests d’intégration (frontend/backend)
- Sécurisation de l’API (vérification des rôles, validation des entrées)
- Optimisation de l’UI/UX
- Documentation technique et utilisateur

### Sprint 5 : Déploiement & livraison
- Préparation à la production (build, variables d’environnement)
- Déploiement du backend et du frontend
- Recette finale avec le client
- Correction des derniers bugs

---

## 6. Livrables attendus

- Code source (frontend & backend)
- Documentation technique
- Manuel utilisateur
- Application déployée et accessible

---

## 7. Suivi & gestion de projet

- Utilisation d’un outil de gestion de tâches (Trello, Jira, GitHub Projects)
- Réunions de suivi à chaque début/fin de sprint
- Démonstration à la fin de chaque sprint

---

## 8. Planning prévisionnel

| Sprint         | Durée estimée | Dates           |
|----------------|---------------|-----------------|
| Sprint 0       | 1 semaine     | [à compléter]   |
| Sprint 1       | 1-2 semaines  | [à compléter]   |
| Sprint 2       | 1-2 semaines  | [à compléter]   |
| Sprint 3       | 1-2 semaines  | [à compléter]   |
| Sprint 4       | 1 semaine     | [à compléter]   |
| Sprint 5       | 1 semaine     | [à compléter]   |

---

## 9. Annexes

- Diagrammes d’architecture
- Maquettes UI/UX
- Liste des API
