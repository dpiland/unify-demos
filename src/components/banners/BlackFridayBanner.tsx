/**
 * BlackFridayBanner Component
 *
 * Bold promotional banner for Black Friday: 20% off everything + free shipping.
 * Controlled by enableBlackFriday boolean flag.
 */

import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

export function BlackFridayBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1010 50%, #1a1a1a 100%)',
        color: '#fff',
        padding: '16px 24px',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '2px solid #b91c1c',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span
          style={{
            background: '#b91c1c',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: 4,
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          20% OFF
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
          BLACK FRIDAY SALE
        </span>
        <span style={{ fontSize: 14, opacity: 0.9 }}>
          Everything on sale + FREE shipping on all orders
        </span>
        <button
          onClick={() => alert('Shop the Black Friday Sale!')}
          style={{
            background: '#fff',
            color: '#1a1a1a',
            border: 'none',
            padding: '6px 20px',
            borderRadius: 4,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          Shop Now
        </button>
      </div>

      <button
        onClick={() => setDismissed(true)}
        style={{
          position: 'absolute',
          top: 8,
          right: 12,
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          opacity: 0.6,
          fontSize: 14,
        }}
      >
        <CloseOutlined />
      </button>
    </div>
  );
}
