# WinCheck Web - Interface de Gestion Système

Interface web professionnelle pour la gestion et l'optimisation des systèmes Windows, avec tableau de bord en temps réel, surveillance des processus, nettoyage de disque et recommandations intelligentes.

## 🎯 Fonctionnalités

- **Tableau de Bord** : Surveillance en temps réel des métriques système (CPU, RAM, disque, réseau)
- **Gestionnaire de Processus** : Visualisation et contrôle des processus actifs
- **Nettoyage de Disque** : Analyse et suppression des fichiers temporaires
- **Nettoyeur de Registre** : Détection et correction des entrées invalides
- **Optimiseur de Services** : Recommandations de désactivation des services
- **Gestionnaire de Démarrage** : Gestion des programmes au démarrage
- **Détection Matérielle** : Informations complètes sur le matériel
- **Moniteur Réseau** : Statistiques de bande passante et connexions actives
- **Recommandations IA** : Suggestions intelligentes basées sur l'analyse système
- **Alertes Email** : Notifications pour événements critiques

## 🎨 Design

Interface inspirée des plans d'architecture technique avec :
- Palette bleu royal profond
- Grille technique discrète
- Accents cyan pour la hiérarchie visuelle
- Marqueurs de dimension CAD
- Typographie sans-serif blanche et gras

## 🛠️ Stack Technologique

- **Frontend** : React 19 + TypeScript + Tailwind CSS 4
- **Backend** : Express 4 + tRPC 11
- **Base de Données** : MySQL / TiDB avec Drizzle ORM
- **Authentification** : Manus OAuth
- **Déploiement** : Vercel

## 📋 Prérequis

- Node.js 22+
- pnpm 10+
- MySQL 8.0+ ou TiDB
- Compte Manus pour l'authentification

## 🚀 Installation Locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/Anonyme-00152/Wincheck.git
cd Wincheck/website
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
# Éditez .env.local avec vos valeurs
```

### 4. Initialiser la base de données

```bash
pnpm db:push
```

### 5. Lancer le serveur de développement

```bash
pnpm dev
```

L'application sera disponible à `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
# Développement
pnpm dev              # Lancer le serveur de développement

# Build
pnpm build            # Compiler pour la production
pnpm start            # Lancer le serveur de production

# Base de données
pnpm db:push          # Pousser les migrations
pnpm db:generate      # Générer les migrations

# Tests
pnpm test             # Exécuter les tests Vitest
pnpm test:watch       # Mode watch

# Qualité du code
pnpm check            # Vérifier les types TypeScript
pnpm format           # Formater le code avec Prettier
```

## 🗄️ Structure de la Base de Données

### Tables principales

- **users** : Utilisateurs authentifiés
- **system_metrics** : Métriques système historiques
- **scan_results** : Résultats des scans (disque, registre, etc.)
- **optimization_reports** : Rapports d'optimisation
- **process_monitoring** : Historique des processus
- **hardware_info** : Informations matériques
- **alert_configs** : Configuration des alertes
- **alert_history** : Historique des alertes

## 🔐 Authentification

L'application utilise Manus OAuth pour l'authentification. Les utilisateurs doivent :

1. Se connecter via Manus
2. Accepter les permissions demandées
3. Accéder au tableau de bord

## 🌐 Déploiement

### Sur Vercel (Recommandé)

Consultez [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions complètes.

Résumé rapide :
1. Connectez votre dépôt GitHub à Vercel
2. Configurez le répertoire racine à `website`
3. Ajoutez les variables d'environnement
4. Déployez

### Sur d'autres plateformes

L'application peut être déployée sur :
- Heroku
- Railway
- Render
- DigitalOcean
- AWS

Assurez-vous que :
- Node.js 22+ est disponible
- Les variables d'environnement sont configurées
- La base de données est accessible

## 📊 Architecture

```
website/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Pages de l'application
│   │   ├── components/    # Composants réutilisables
│   │   ├── contexts/      # Contextes React
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── lib/           # Utilitaires
│   │   └── App.tsx        # Composant racine
│   └── index.html
├── server/                 # Backend Express
│   ├── _core/             # Configuration de base
│   ├── db.ts              # Helpers de base de données
│   ├── routers.ts         # Procédures tRPC
│   └── index.ts           # Point d'entrée
├── drizzle/               # Migrations et schéma
├── shared/                # Code partagé
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## 🧪 Tests

Exécutez les tests avec :

```bash
pnpm test
```

Les tests sont écrits avec Vitest et couvrent :
- Authentification
- Opérations de base de données
- Procédures tRPC
- Logique métier

## 📝 Fichiers de Configuration

- **vercel.json** : Configuration Vercel
- **.env.example** : Variables d'environnement exemple
- **tsconfig.json** : Configuration TypeScript
- **vite.config.ts** : Configuration Vite
- **drizzle.config.ts** : Configuration Drizzle ORM

## 🤝 Contribution

Les contributions sont bienvenues ! Veuillez :

1. Fork le dépôt
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour toute question ou problème :
- Consultez la [documentation](./DEPLOYMENT.md)
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

## 🎓 Ressources

- [Documentation React](https://react.dev)
- [Documentation tRPC](https://trpc.io)
- [Documentation Tailwind CSS](https://tailwindcss.com)
- [Documentation Drizzle ORM](https://orm.drizzle.team)
- [Documentation Vercel](https://vercel.com/docs)

---

Fait avec ❤️ par l'équipe WinCheck
