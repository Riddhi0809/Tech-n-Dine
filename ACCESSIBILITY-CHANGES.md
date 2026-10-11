# AR Dine: accessibility and initial-load changes

This version keeps the existing React + Vite frontend and Express backend. It does not add any dependencies or change backend files.

## Files changed

- `client/src/App.jsx`
  - Saves the Enhanced colour distinction preference in browser storage when available.
  - Shows the toggle on the landing screen, customer menu, order-status screen, and chef screen.
  - Adds a checkmark and `aria-pressed` state to the selected menu category.
  - Makes dish ingredient details available through a keyboard-operable image button.
  - Loads the first visible dish image eagerly and lets the browser lazy-load other dish images.
  - Gives ingredient notes text labels instead of using a coloured dot alone.
  - Adds Escape-key handling and an accessible label for the ingredient dialog.
- `client/src/App.css`
  - Styles the toggle, keyboard focus outline and mobile layout.
  - Defines the enhanced mode using stronger borders and high-contrast selected controls.
- `client/src/index.css`
  - Removes conflicting Vite starter styles, including dark heading text that could be hard to read on the dark app background.
- `client/src/components/AccessibilityToggle.jsx` (new)
  - The small reusable toggle component. It uses React and CSS only.
- `client/src/components/Navbar.jsx`
  - Places the toggle in the main app header.
- `client/src/components/GuestSwitcher.jsx`
  - Adds a checkmark and `aria-pressed` state to the selected guest.
- `client/src/components/ChefDashboard.jsx`
  - Adds the toggle and checkmarks/pressed states to selected order-status buttons.
- `README.md`
  - Documents the changes and the current prototype limitations.

## How the mode works

The normal mode remains the default. Important states already include labels or symbols, so users do not have to rely on colour alone. Turning on Enhanced colour distinction strengthens borders and selected-state contrasts. The preference is remembered in local storage where storage is available. The setting is CSS-based and does not download another colour-filter library.

This is not a medical colour-vision simulator, and it cannot guarantee that every colour-vision deficiency is accommodated. Test it with people who have different colour-vision deficiencies before treating it as a finished accessibility feature.

## Loading behaviour

The first dish image in the selected category is prioritised; the other dish images use native browser lazy loading. This can reduce unnecessary image requests during the initial render and does not require a new package.

The uploaded source archive did not contain an AR renderer or 3D model-loading code. Therefore this version cannot defer an AR engine/model. Once the AR viewer is present, load it only when the user taps **View in AR**, and load only the selected dish's model rather than every model at startup.

## Verify locally

From a terminal in `client/`:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Manually test the landing page, toggle persistence after refresh, menu category selection, guest selection, cart controls, order status, and chef dashboard on a phone-sized viewport. This environment could parse the JSX and CSS, but dependency installation did not complete, so a full Vite build and ESLint run were not verified here.
