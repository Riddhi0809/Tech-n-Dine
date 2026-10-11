export default function GuestSwitcher({ activeGuest, setActiveGuest }) {
  const guests = ['You', 'Guest 2', 'Guest 3'];

  return (
    <div className="guest-switcher" role="group" aria-label="Choose who is ordering">
      {guests.map((guest) => {
        const isActive = activeGuest === guest;

        return (
          <button
            key={guest}
            type="button"
            className="guest-switch-button"
            aria-pressed={isActive}
            onClick={() => setActiveGuest(guest)}
            style={{
              background: isActive ? '#ff9f0a' : '#161412',
              color: isActive ? '#000' : '#fff',
              border: '1px solid #26221d',
              padding: '0.5rem 1.25rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
          >
            {isActive ? '✓ ' : ''}{guest}
          </button>
        );
      })}
    </div>
  );
}
