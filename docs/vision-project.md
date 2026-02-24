# 🌍 Vision Stratégique & Architecture — Plateforme SALMA

Ce document définit les piliers techniques et fonctionnels de la plateforme SALMA (by AG Technologies) pour répondre aux exigences de performance, de conversion et de prestige de l'agence.

## 1. Quelle est la particularité de ce site ?
Contrairement aux sites de voyage classiques, SALMA se positionne comme une **plateforme de confiance et de réussite**. 
- **Focus Résultat :** Mise en avant de la garantie "Satisfait ou Remboursé" et des preuves sociales (Success Stories).
- **Spécialisation :** Une expérience utilisateur (UX) segmentée spécifiquement pour les corridors **Chine** et **Allemagne**, respectant les codes académiques de ces deux pays.

## 2. Interface & UX (Expérience Utilisateur)
L'interface est conçue pour réduire la charge cognitive et maximiser l'engagement :
- **Mobile-First :** 80% des étudiants consultent sur smartphone. L'interface est pensée comme une application mobile native.
- **Design Émotionnel :** Utilisation de la charte Bordeaux Royal et Or pour instaurer un sentiment de prestige et d'accessibilité au succès.
- **Micro-interactions :** Animations fluides pour guider l'œil vers les actions prioritaires (CTAs).

## 3. Structure de la Plateforme
Le site est structuré selon un **entonnoir de conversion** :
1. **Découverte (Home) :** Rassurer sur l'expertise d'AG Technologies.
2. **Exploration (Catalogue) :** Permettre un choix rapide via des filtres intelligents.
3. **Information (Détail Bourse) :** Lever tous les doutes (conditions, avantages, délais).
4. **Action (Conversion) :** Formulaire de contact simplifié et lien direct WhatsApp.

## 4. Architecture Technique (Stack Ingénieur)
Nous utilisons une architecture **"Headless"** pour une séparation totale des responsabilités :
- **Frontend :** Next.js 15 (App Router). Permet un référencement (SEO) optimal et une vitesse de navigation instantanée grâce au rendu hybride.
- **Backend :** Django REST Framework. Garantit une sécurité bancaire des données et une gestion robuste des bourses en interne.
- **API :** Communication via JSON, permettant de faire évoluer le site ou de créer une application mobile future sans changer le backend.

## 5. Gestion des Données (Data Management)
- **Centralisation :** Toutes les bourses sont gérées en un seul endroit par l'administrateur.
- **Performance :** Utilisation d'un système de mise en cache intelligent (ISR) : le site se met à jour instantanément dès qu'une bourse est modifiée en admin, sans ralentir l'utilisateur.

## 6. Fluidité & Optimisation
- **Zéro Latence :** Optimisation des images (Next/Image) et des scripts pour obtenir un score de performance proche de 100 sur Google Lighthouse.
- **Accessibilité :** Site fluide même avec une connexion internet instable (optimisation des paquets de données).

## 7. Chatbot & Assistance
- **WhatsApp Intelligent :** Intégration d'un bouton flottant qui pré-remplit le message en fonction de la page consultée (ex: *"Bonjour SALMA, je suis intéressé par la bourse Master en Allemagne..."*).
- **Assistant IA (Évolutif) :** Structure prête pour l'intégration d'un agent IA capable de répondre aux questions sur les procédures de visa 24h/24.

## 8. Caractère Innovateur & Conversion
L'innovation majeure est le **"Scholarship Matcher"** :
- Un outil interactif qui permet à l'étudiant de trouver sa bourse idéale en 3 clics (Niveau, Budget, Pays). 
- **Impact :** Transforme un visiteur passif en un prospect qualifié, augmentant radicalement le taux de conversion par rapport à une simple liste statique.

---
**AG Technologies — L'excellence au service de votre mobilité internationale.**