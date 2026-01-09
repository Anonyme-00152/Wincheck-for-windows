# WinCheck Web - Project TODO

## Architecture & Setup
- [x] Configurer la base de données (schéma utilisateurs, scans, rapports, métriques)
- [x] Créer les modèles de données (SystemMetrics, ProcessInfo, ScanResult, OptimizationReport)
- [x] Implémenter les helpers de base de données

## Design System & UI
- [x] Configurer le thème avec palette bleu royal profond et grille technique
- [x] Créer composants de base (Card, Button, Input, Select, Table)
- [ ] Implémenter le layout principal (DashboardLayout avec sidebar)
- [x] Créer composants visuels techniques (grille de fond, marqueurs de dimension)
- [ ] Développer la navigation principale

## Tableau de Bord (Dashboard)
- [x] Afficher métriques CPU en temps réel
- [x] Afficher métriques RAM en temps réel
- [x] Afficher métriques disque en temps réel
- [x] Afficher métriques réseau en temps réel
- [ ] Créer graphiques de tendance (historique 24h)
- [ ] Implémenter refresh automatique des données
- [x] Ajouter indicateurs d'alerte (seuils critiques)

## Gestionnaire de Processus
- [x] Créer page de liste des processus actifs
- [x] Implémenter recherche et filtrage de processus
- [x] Afficher détails des processus (CPU, RAM, état)
- [ ] Ajouter fonctionnalité d'arrêt de processus
- [x] Implémenter tri par colonne
- [ ] Créer graphique d'utilisation par processus

## Nettoyage de Disque
- [x] Créer page d'analyse de disque
- [x] Implémenter détection fichiers temporaires
- [x] Implémenter détection fichiers cache
- [x] Implémenter détection fichiers journaux
- [ ] Ajouter fonctionnalité de suppression sécurisée
- [x] Afficher espace récupérable
- [ ] Créer rapport de nettoyage

## Nettoyeur de Registre
- [ ] Créer page de scan du registre
- [ ] Implémenter détection entrées invalides
- [ ] Implémenter détection clés orphelines
- [ ] Implémenter détection références cassées
- [ ] Ajouter fonctionnalité de correction
- [ ] Créer sauvegarde avant correction
- [ ] Afficher rapport de correction

## Optimiseur de Services
- [ ] Créer page de gestion des services Windows
- [ ] Afficher liste des services avec état
- [ ] Implémenter recommandations de désactivation
- [ ] Ajouter fonctionnalité d'activation/désactivation
- [ ] Créer profils d'optimisation prédéfinis
- [ ] Afficher impact estimé de chaque service

## Gestionnaire de Démarrage
- [ ] Créer page de gestion des programmes au démarrage
- [ ] Afficher liste des programmes au démarrage
- [ ] Implémenter activation/désactivation
- [ ] Afficher temps de démarrage estimé
- [ ] Créer recommandations de désactivation
- [ ] Afficher historique des modifications

## Détection Matérielle
- [ ] Créer page d'information matérielle
- [ ] Afficher informations CPU (modèle, cores, fréquence)
- [ ] Afficher informations GPU
- [ ] Afficher informations RAM (capacité, type, vitesse)
- [ ] Afficher informations stockage (disques, partitions)
- [ ] Afficher informations carte mère
- [ ] Afficher informations système d'exploitation

## Moniteur Réseau
- [ ] Créer page de monitoring réseau
- [ ] Afficher statistiques de bande passante
- [ ] Afficher connexions réseau actives
- [ ] Implémenter graphique de trafic
- [ ] Afficher adresse IP et informations réseau
- [ ] Créer historique des connexions

## Recommandations IA
- [ ] Intégrer appels LLM pour analyse des métriques
- [ ] Implémenter génération de recommandations
- [ ] Créer page d'affichage des recommandations
- [ ] Ajouter priorités aux recommandations
- [ ] Implémenter exécution automatique des recommandations
- [ ] Créer historique des recommandations appliquées

## Alertes Email
- [ ] Configurer service d'envoi d'email
- [ ] Implémenter alerte disque plein
- [ ] Implémenter alerte processus suspect
- [ ] Implémenter alerte erreurs registre
- [ ] Implémenter alerte utilisation CPU élevée
- [ ] Implémenter alerte utilisation RAM élevée
- [ ] Créer page de configuration des alertes
- [ ] Ajouter préférences de notification utilisateur

## Sauvegarde & Rapports
- [ ] Créer table de stockage des scans
- [ ] Créer table de stockage des rapports
- [ ] Créer table de stockage des métriques historiques
- [ ] Implémenter sauvegarde automatique des scans
- [ ] Implémenter génération de rapports PDF
- [ ] Créer page d'historique des scans
- [ ] Implémenter export des données

## Responsive Design
- [ ] Tester sur écrans desktop (1920x1080+)
- [ ] Tester sur écrans tablette (768px-1024px)
- [ ] Adapter layout pour mobile (optionnel)
- [ ] Vérifier accessibilité (contraste, navigation clavier)

## Tests & Optimisation
- [ ] Écrire tests unitaires pour les procédures tRPC
- [ ] Tester les flux d'authentification
- [ ] Optimiser les requêtes de base de données
- [ ] Tester la performance du tableau de bord
- [ ] Vérifier la sécurité des opérations sensibles

## Déploiement
- [ ] Créer checkpoint final
- [ ] Exposer l'application web
- [ ] Tester l'accès via URL publique
- [ ] Vérifier tous les fonctionnalités en production
