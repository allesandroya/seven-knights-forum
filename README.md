# Komunitas Forum

A community forum built with React + Vite. Features Home, News, and Forum pages with interactive likes and expandable replies.

## Deploy to GitHub Pages

```bash
# 1. Install dependencies
npm install

# 2. Init git & push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/komunitas-forum.git
git push -u origin main

# 3. Build & deploy
npm run build
npm run deploy
```

Then go to repo **Settings → Pages → Source: gh-pages branch → Save**.

Live at: `https://YOUR_USERNAME.github.io/komunitas-forum/`

> If your repo name is different, update `base` in `vite.config.js`.

## Development

```bash
npm install
npm run dev
```
