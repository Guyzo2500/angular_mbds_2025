# Gestion des Assignments - Projet MBDS 2024/2025

## Description du Projet
Ce projet est une application web de gestion des assignments développée avec Angular pour le frontend et Node.js pour le backend. L'application permet de gérer les devoirs des étudiants avec des fonctionnalités avancées comme l'authentification, la gestion des matières, et l'attribution des notes.

## Fonctionnalités Principales
- Authentification des utilisateurs avec rôles (admin)
- Gestion complète des assignments (CRUD)
- Association des assignments avec des matières et des professeurs
- Système de notation
- Interface utilisateur moderne avec Material Design
- Barre latérale (Sidebar) et barre d'outils (Toolbar)
- Formulaire en plusieurs étapes pour l'ajout d'assignments

## Prérequis
- Node.js (version 14 ou supérieure)
- MongoDB (version 4.4 ou supérieure)
- Angular CLI (version 12 ou supérieure)
- Git

## Installation Locale

### 1. Cloner le projet
```bash
git clone https://github.com/Guyzo2500/angular_mbds_2025.git
cd angular_mbds_2025
```

### 2. Installation du Backend
```bash
cd Back
npm install
```

### 3. Configuration du Backend
- Créez un fichier `.env` dans le dossier Back avec les variables suivantes :
```
MONGODB_URI=mongodb+srv://mbds:UniCA25@assignments.mxszzes.mongodb.net/assignments?retryWrites=true&w=majority
PORT=8010
```

### 4. Installation du Frontend
```bash
cd Front
npm install
```

### 5. Configuration du Frontend
- Créez un fichier `environment.ts` dans `Front/src/environments/` avec :
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8010/api'
};
```

## Démarrage de l'Application

### Backend
```bash
cd Back
node server.js
```

### Frontend
```bash
cd Front
ng serve
```

L'application sera accessible à l'adresse : http://localhost:4200

## Structure du Projet
```
angular_mbds_2025/
├── Back/                 # Backend Node.js
│   ├── routes/          # Routes API
│   ├── model/           # Modèles MongoDB
│   ├── middleware/      # Middleware (auth, etc.)
│   └── server.js        # Point d'entrée du serveur
│
└── Front/               # Frontend Angular
    ├── src/
    │   ├── app/        # Composants Angular
    │   ├── assets/     # Images et ressources
    │   └── environments/ # Configuration
    └── angular.json    # Configuration Angular
```

## Fonctionnalités Spéciales
- **Interface Material** : Design moderne et responsive
- **Base de Données** : Plus de 1000 assignments générés automatiquement
- **Formulaire Stepper** : Ajout d'assignments en plusieurs étapes

## Déploiement
Le projet est déployé sur Render.com :
- Frontend : 
- Backend : 
nous avons des problemes avec le deploiement que nous essayons toujours de regler 

## Vidéo de Démonstration
Une vidéo de démonstration est disponible sur loom : https://www.loom.com/share/27acf8e9702843c7995db8d99461d978?sid=ba28ea78-7175-4a0f-9b9d-ed0dfb45d5f2

## Contribution
Ce projet a été développé par :
- Bayala Ange Fleur & Assi Guy

## Remerciements
- Copilot pour la gestion des erreures et a chat pour nous avoir aider a gerer le deploiement 
- Kindo Mohamed & Bamba Ahmed avec qui nous nous sommes associer pour travailler parce nous avons eu beaucoup d'incomprehension avec l'exercice 


