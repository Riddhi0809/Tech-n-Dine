import { useState } from 'react';

export default function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const categories = ['Starters', 'Mains', 'Breads', 'Desserts', 'Beverages'];

  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          style={{
            background: activeCategory === cat ? '#26221d' : '#161412',
            color: activeCategory === cat ? '#ff9f0a' : '#8e8780',
            border: `1px solid ${activeCategory === cat ? '#ff9f0a' : '#26221d'}`,
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}