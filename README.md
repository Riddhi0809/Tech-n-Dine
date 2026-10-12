# Tech-n-Dine — AR Dine prototype

A beginner-friendly React + Vite frontend and Node.js + Express backend for a restaurant menu and table-ordering prototype.

## Project structure

```text
saffron-silicon-web/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable interface components
│   │   ├── utils/          # Small reusable helper functions
│   │   ├── App.jsx         # Main screens and application state
│   │   └── ...
│   └── package.json
└── server/                 # Express backend and Mongoose model
    ├── models/
    ├── server.js
    └── package.json
```

## Run the frontend

1. Install Node.js (an LTS version is recommended).
2. Open a terminal in `client/`.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed in the terminal.

Useful frontend commands:

- `npm run dev` — start the development server.
- `npm run lint` — check code for configured lint issues.
- `npm run build` — create a production build.

## Run the backend

1. Open a second terminal in `server/`.
2. Run `npm install`.
3. Create a `.env` file using `.env.example` as a guide.
4. Ensure MongoDB is running and the `MONGO_URI` value is correct.
5. Run `npm start`.

The current backend only includes a health-check route and a Mongoose model. The frontend ordering flow is still a local prototype and does not yet create orders through backend API endpoints.

## Current prototype limitations

- Order data is saved in this browser's `localStorage`. It can sync between tabs of the same browser origin, but **it does not share orders between different devices or customers**.
- Payment buttons show demonstration alerts; they do not process payments.
- The supplied source archive does not include an AR rendering implementation. The menu and ordering interface are present, but AR viewing needs to be integrated separately.
- The current table-summary sidebar includes both submitted order items and items waiting to be submitted. Removing, changing quantity, or using a payment action can affect submitted items too. This is preserved for now to avoid silently changing the current prototype's workflow; it should be redesigned before production.

## What was improved in this update

- Extracted small reusable helpers for guest-name comparison, quantity handling, totals, and ID generation.
- Corrected the active guest's total so it includes that guest's quantities.
- Changed chef order-status updates to copy nested state rather than mutate existing objects.
- Added stable line IDs so cart operations do not depend on JavaScript object identity.
- Added safe parsing and error handling when reading and writing saved orders.
- Added stable React keys where order and cart lines are rendered.

These changes are intended to keep the app familiar and understandable, not introduce a new architecture.


## Accessibility and initial-load improvements

- The menu and order views have an **Enhanced colour distinction** toggle.
- The toggle preference is saved in local storage when available; it does not add a third-party library.
- Selected menu categories, selected guests, and kitchen status buttons include text/symbol cues as well as colour.
- Ingredient notes show text labels rather than relying only on a coloured dot. Ingredient data is a guide; allergy information should be confirmed with restaurant staff.
- Menu images use browser-native lazy loading after the first image to reduce unnecessary initial image requests.
- Keyboard focus is visibly outlined.

The enhanced mode adjusts CSS only. It does not simulate a medical condition or guarantee that every colour-vision deficiency is accommodated; testing with users remains necessary. The supplied source still does not include an AR renderer, so AR models are not yet dynamically loaded by this change.
