import AccessibilityToggle from './AccessibilityToggle';

export default function Navbar({ enhancedColourDistinction, setEnhancedColourDistinction }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h2 style={{ margin: 0 }}>Saffron & Silicon</h2>
        <span className="navbar-subtitle">Table T-04 · Web Prototype</span>
      </div>
      <div className="navbar-actions">
        <AccessibilityToggle
          enabled={enhancedColourDistinction}
          onChange={setEnhancedColourDistinction}
        />
        <span className="session-label">QR-linked demo session</span>
      </div>
    </header>
  );
}
