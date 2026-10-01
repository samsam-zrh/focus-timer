# Focus Timer

Un minuteur Pomodoro simple pour alterner une session de concentration et une petite pause.

Le projet utilise seulement **HTML, CSS et JavaScript**. Il fonctionne directement dans le navigateur, sans installation et sans compte.

## Fonctionnalités

- session de concentration de 25 minutes ;
- pause de 5 minutes ;
- démarrer, mettre en pause et recommencer ;
- compteur de sessions terminées aujourd'hui ;
- sauvegarde du compteur dans le navigateur ;
- raccourcis clavier : `Espace` pour démarrer ou mettre en pause, `R` pour recommencer.

## Lancer le projet

Ouvrir directement `index.html`, ou utiliser un petit serveur local :

```bash
python3 -m http.server 8000
```

Puis ouvrir [http://localhost:8000](http://localhost:8000).

## Ce que j'ai pratiqué

La manipulation du DOM, `setInterval`, la sauvegarde avec `localStorage`, les états d'une petite interface et quelques bases d'accessibilité.

## Limites actuelles

Les durées sont fixes et il n'y a pas encore de son à la fin d'une session. Je préfère garder une base courte avant d'ajouter des réglages.
