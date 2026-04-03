# Clanx Gamification UI

This project is the frontend for the Clanx campaign gamification experience. It turns the Figma flow into a working React app with a homepage hero, a reward-creation modal, nested selection states, a calendar picker, and a success toast.

## Stack

- React 19
- Redux Toolkit and React Redux for application state
- Tailwind CSS for styling
- `date-fns` for date handling
- CRA for the app scaffold

## What lives here

- The campaign homepage `Gamification` section and feature cards
- The reward modal with reward event, reward with, and time-bound controls
- Nested flows for sales targets, posting cadence, commission tiers, and date selection
- Design tokens in `tailwind.config.js` for shared colors, spacing, shadows, and radii
- Figma PNG assets in `src/components/icons`

## Getting Started

Install dependencies and start the app:

```bash
npm install
npm start
```

## Scripts

- `npm start` - run the app in development mode
- `npm test` - run the test runner
- `npm run build` - create a production build
- `npm run eject` - eject from CRA
