# Portfolio-YSF

Portfolio 3D interactif de **Youssef Yaslane** (Data Analyst · Data Scientist · Data Engineer) — un petit monde low-poly où le visiteur conduit une voiture le long de rues thématiques pour découvrir son CV : expériences, projets, compétences, formations et contact.

**🔗 En ligne : [portfolio-ysf-livid.vercel.app](https://portfolio-ysf-livid.vercel.app)**

## Concept

Un rond-point central (Accueil) dessert 5 rues, chacune menant à une section du CV. Chaque arrêt le long d'une rue représente un élément précis (une expérience, un projet, une compétence...), avec son propre décor et un panneau affichant son contenu. Une grande enseigne 3D en relief marque le début de chaque rue.

## Contrôles

- **Clavier** : `WASD` / flèches directionnelles
- **Mobile** : joystick tactile (apparaît automatiquement)

## Fonctionnalités

- Voiture pilotable (accélération, freinage, marche arrière, virages)
- 5 rues thématiques · 30 arrêts individuels générés depuis les données du CV
- Caméra à la troisième personne avec suivi fluide
- Mode sombre (éclairage nocturne, lampadaires allumés)
- Minimap, poussière derrière les roues, nuages et oiseaux animés, fleurs qui tournent
- Musique d'ambiance (bouton son), plein écran, réinitialisation de la position
- Assets 3D compressés (Draco/Meshopt) et résolution adaptative pour de bonnes performances

## Stack

React · Vite · TypeScript · React Three Fiber · Drei · Three.js · GSAP · Tailwind CSS · Framer Motion · Zustand

## Démarrage

```bash
npm install
npm run dev
```

## Structure des données

Toutes les informations du CV (expériences, projets, compétences, formations) sont centralisées dans `src/data/` — modifier ces fichiers suffit à mettre à jour le contenu du site sans toucher au reste du code.

## Crédits

- Modèles 3D : [Kenney](https://kenney.nl) (Car Kit, City Kit Commercial, Nature Kit, Mini Forest) — licence CC0
- Texture d'herbe : [ambientCG](https://ambientcg.com) (Grass001) — licence CC0
