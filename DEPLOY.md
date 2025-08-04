# 🚀 Déploiement sur Coolify

## Configuration préalable

Votre application est maintenant prête pour le déploiement Coolify ! Voici les étapes à suivre.

## 📋 Étapes de déploiement

### 1. Créer un nouveau projet dans Coolify
- Connectez-vous à votre interface Coolify
- Créez un nouveau projet
- Choisissez "Docker Compose" ou "Dockerfile"

### 2. Configuration Git
```bash
# Si pas déjà fait, initialisez Git
git init
git add .
git commit -m "Configuration pour déploiement Coolify"

# Ajoutez votre repository distant (GitHub, GitLab, etc.)
git remote add origin https://github.com/votre-username/gestion-de-projet.git
git push -u origin main
```

### 3. Variables d'environnement dans Coolify

Dans l'interface Coolify, ajoutez ces variables d'environnement :

```
NEXT_PUBLIC_LOGIN_PASSWORD=VotreMotDePasseSecurise2025
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 4. Configuration du port
- **Port d'écoute** : `3000`
- **Nom du domaine** : votre-domaine.com (ou sous-domaine)

### 5. Build et déploiement
Coolify détectera automatiquement le `Dockerfile` et construira l'application.

## 🔧 Configuration avancée

### SSL/TLS
Coolify gère automatiquement les certificats SSL avec Let's Encrypt.

### Monitoring
Ajoutez ces labels Docker dans Coolify pour le monitoring :
```
coolify.managed=true
coolify.name=gestion-projet
```

## 🔍 Vérification du déploiement

1. Vérifiez que l'application démarre sans erreur
2. Testez l'accès via votre domaine
3. Vérifiez que l'authentification fonctionne
4. Contrôlez les logs dans l'interface Coolify

## 🛠️ Dépannage

### Erreurs communes
- **Port déjà utilisé** : Vérifiez la configuration du port dans Coolify
- **Variables d'environnement** : Assurez-vous qu'elles sont bien définies
- **Build failed** : Vérifiez les logs de build dans Coolify

### Logs
```bash
# Voir les logs en temps réel dans Coolify
# ou via SSH sur votre VPS :
docker logs -f nom-du-container
```