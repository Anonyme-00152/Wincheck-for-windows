# Déploiement WinCheck Web sur Vercel

Ce guide explique comment déployer l'application WinCheck Web sur Vercel.

## Prérequis

- Un compte GitHub avec le dépôt `Anonyme-00152/Wincheck` cloné
- Un compte Vercel (gratuit sur https://vercel.com)
- Une base de données MySQL (TiDB, PlanetScale, ou autre)
- Les variables d'environnement nécessaires

## Étape 1 : Préparer la base de données

Avant de déployer, vous devez avoir une base de données MySQL accessible en ligne. Voici les options :

### Option A : PlanetScale (Recommandé - Gratuit)
1. Créez un compte sur https://planetscale.com
2. Créez une nouvelle base de données
3. Copiez la chaîne de connexion MySQL

### Option B : TiDB Cloud
1. Créez un compte sur https://tidbcloud.com
2. Créez un cluster
3. Copiez la chaîne de connexion

### Option C : Votre propre serveur MySQL
Assurez-vous que le serveur est accessible depuis Internet avec un mot de passe fort.

## Étape 2 : Configurer les variables d'environnement

Avant de déployer, préparez vos variables d'environnement. Consultez `.env.example` pour la liste complète.

Variables essentielles :
- `DATABASE_URL` : Chaîne de connexion MySQL
- `JWT_SECRET` : Clé secrète pour les sessions (générez une clé aléatoire forte)
- `VITE_APP_ID` : ID de l'application Manus
- `OAUTH_SERVER_URL` : URL du serveur OAuth Manus
- `OWNER_OPEN_ID` : Votre ID utilisateur Manus
- `OWNER_NAME` : Votre nom

## Étape 3 : Déployer sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. Allez sur https://vercel.com/import
2. Sélectionnez "Import Git Repository"
3. Entrez l'URL du dépôt : `https://github.com/Anonyme-00152/Wincheck`
4. Cliquez sur "Import"
5. Configurez les paramètres du projet :
   - **Project Name** : `wincheck-web`
   - **Framework Preset** : `Other`
   - **Root Directory** : `website`
   - **Build Command** : `pnpm build`
   - **Output Directory** : `dist`
   - **Install Command** : `pnpm install`

6. Cliquez sur "Environment Variables" et ajoutez toutes les variables du fichier `.env.example`
7. Cliquez sur "Deploy"

### Méthode 2 : Via la CLI Vercel

```bash
# Installez la CLI Vercel
npm i -g vercel

# Connectez-vous à Vercel
vercel login

# Naviguez vers le dossier website
cd website

# Déployez
vercel

# Suivez les instructions interactives
```

## Étape 4 : Configurer les variables d'environnement dans Vercel

Après le déploiement initial :

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `wincheck-web`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez toutes les variables d'environnement nécessaires
5. Redéployez le projet

## Étape 5 : Initialiser la base de données

Après le déploiement, vous devez initialiser la base de données :

```bash
# Localement, dans le dossier website
DATABASE_URL="votre_url_mysql" pnpm db:push
```

Ou via Vercel CLI :

```bash
vercel env pull
pnpm db:push
```

## Dépannage

### Erreur "DATABASE_URL is not set"
- Assurez-vous que la variable `DATABASE_URL` est définie dans les variables d'environnement de Vercel
- Redéployez après avoir ajouté la variable

### Erreur de connexion à la base de données
- Vérifiez que la chaîne de connexion est correcte
- Vérifiez que votre base de données accepte les connexions distantes
- Vérifiez les pare-feu et les règles de sécurité

### Erreur "JWT_SECRET is not set"
- Générez une clé secrète forte : `openssl rand -base64 32`
- Ajoutez-la aux variables d'environnement Vercel

### Erreur de build
- Vérifiez que le `Root Directory` est défini à `website`
- Vérifiez que `pnpm` est utilisé comme gestionnaire de paquets
- Consultez les logs de build dans Vercel

## Domaine personnalisé

Pour ajouter un domaine personnalisé :

1. Allez dans **Settings** → **Domains**
2. Cliquez sur "Add Domain"
3. Entrez votre domaine
4. Suivez les instructions pour configurer les enregistrements DNS

## Mise à jour du code

Après chaque push sur GitHub (branche `main`) :

1. Vercel redéploiera automatiquement
2. Vous verrez le statut du déploiement dans le dashboard
3. Une fois terminé, votre application sera mise à jour

## Support

Pour plus d'aide :
- Documentation Vercel : https://vercel.com/docs
- Documentation Manus : https://docs.manus.im
- Issues GitHub : https://github.com/Anonyme-00152/Wincheck/issues
