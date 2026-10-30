# Nihara Adventure

A cozy 3D browser adventure starring Nihara and Teddy. Six playable chapters follow a connected bedtime story about restoring a missing star.

## Chapters and activities

The nursery, living room, and garden each have three stars to collect. Three harder challenge worlds add six stars per world, a moving lift, elevated collectibles, and three required brain activities:

- Memory lights: repeat a sequence that grows from three to five steps.
- Number detective: solve three addition/subtraction questions.
- Shape patterns: finish three repeating patterns.

Find every star and complete the brain challenges before returning to Teddy. Wrong answers allow another try. Restart resets the current attempt; completed chapters and the selected chapter remain saved in browser storage when available. Every chapter is selectable, so older completion saves remain useful and players can jump straight to Chapter 4.

## Story and narration

Every chapter has a two-page opening story and an ending. The book button reopens the chapter story. Read aloud uses the browser's speech synthesis with a slower English voice when supported. Audio requires pressing Read aloud; voice availability and quality depend on the browser/device. Written story text is always available. Narration can be stopped, and closing the story cancels speech. Story and brain-game overlays pause player controls.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev -- --port 5173
```

Move with WASD / arrow keys or hold the visible direction buttons. Jump with Space or the jump button.

```sh
npm run build
npm run preview
```

All models are generated locally. No external assets, API keys, or backend services are required.

## Vercel

Framework: Vite. Build: `npm run build`. Output: `dist`. No environment variables.

Source: `sanjeek/Nihara-Baby`. The Vercel import created a separate `sanjeek/nihara-baby-game` repository, so deployment updates must reach the repository selected in Vercel → Settings → Git. The desktop badge identifies this release as `v1.2 · 6 chapters`.
