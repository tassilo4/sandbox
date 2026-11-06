# Interactive UI Lab

A collection of interactive graphics, motion studies, and interface experiments built with React and Next.js. Each experiment has its own route and focuses on one visual or interaction technique.

## Experiments

- Image and animation effects rendered as ASCII
- WebGL dithering, refraction, and animated gradients
- Canvas particle systems and cursor interactions
- Magnetic line fields and pointer-aware controls
- Three-dimensional card and orbit compositions

The home page provides a static index of every experiment. The project intentionally has no database, authentication, external write endpoints, or server-side URL proxying.

## Getting started

```bash
git clone https://github.com/tassilo4/sandbox.git
cd sandbox
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then choose an experiment.

## Commands

```bash
npm run dev        # start the development server
npm run lint       # run ESLint
npm run typecheck  # check TypeScript without emitting files
npm run build      # create a production build
```

## Adding an experiment

1. Create a route under `app/<experiment-name>/page.tsx`.
2. Keep reusable rendering logic under `components/`.
3. Add the experiment to the static index in `app/page.tsx`.
4. Verify keyboard access, reduced-motion behavior where applicable, and responsive layout.

## License

MIT
