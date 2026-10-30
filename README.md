# Nihara Adventure

A three-chapter 3D browser adventure built with Three.js and Vite. Explore the nursery, living room and garden. Each has three stars to find and a Teddy goal to reach. Jump onto the platforms to collect elevated stars and finish each chapter. The finish screen takes you to the next chapter; chapter buttons allow direct selection and replay on desktop and mobile. Completed chapters and your selected chapter are saved locally in your browser when storage is available.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev -- --port 5173
```

Move with WASD / arrow keys or hold the visible direction buttons. Jump with Space or the jump button. Restart resets the current chapter without erasing completed chapters.

```sh
npm run build
npm run preview
```

All objects are generated locally. No external assets, API keys, or backend services are required. This is a complete small three-level game with stylized geometric art; it does not reproduce the detail of the concept illustration.

## Vercel

Framework: Vite. Build command: `npm run build`. Output directory: `dist`. No environment variables.

The original source is `sanjeek/Nihara-Baby`. The Vercel import created a separate `sanjeek/nihara-baby-game` repository. Changes must reach the repository selected in Vercel → Project → Settings → Git to deploy. The UI displays `v1.1 · 3 chapters` on desktop so the three-chapter release is identifiable.
