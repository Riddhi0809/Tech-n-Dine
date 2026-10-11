export default function AccessibilityToggle({ enabled, onChange }) {
  return (
    <div className="accessibility-setting">
      <span className="accessibility-setting-label">Accessibility</span>
      <button
        type="button"
        className="accessibility-toggle"
        aria-pressed={enabled}
        onClick={() => onChange(!enabled)}
        title="Increase visual contrast and strengthen selected-state indicators"
      >
        <span aria-hidden="true">{enabled ? '✓' : '◉'}</span>
        <span>Enhanced colour distinction: {enabled ? 'On' : 'Off'}</span>
      </button>
    </div>
  );
}
