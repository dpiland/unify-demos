/**
 * TestBanner Component — Intentionally Broken
 *
 * This banner is deliberately ugly and broken to demo a "bad deploy" scenario.
 * The talk track: "A dev pushed this broken banner to production. Instead of
 * a hotfix and redeploy, we just toggle the flag off — instant rollback."
 */

import { Typography } from 'antd';

const { Text } = Typography;

export function TestBanner() {
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #ff00ff, #00ff00, #ffff00)',
        padding: '18px 24px',
        overflow: 'hidden',
        borderBottom: '4px dashed red',
      }}
    >
      {/* Overlapping text — intentionally clashing */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text
            strong
            style={{
              fontSize: 22,
              color: '#ff0000',
              textShadow: '2px 2px #00ff00',
              fontFamily: 'Comic Sans MS, cursive',
              letterSpacing: -1,
            }}
          >
            🔥🔥🔥 MEGA SUPER SALE!!! EVERYTHING MUST GO 🔥🔥🔥
          </Text>
          <br />
          <Text
            style={{
              fontSize: 11,
              color: '#0000ff',
              fontFamily: 'Times New Roman, serif',
              textTransform: 'uppercase',
              letterSpacing: 4,
            }}
          >
            up to maybe like 900% off??? idk ask steve
          </Text>
        </div>

        {/* Broken CTA — clipped and wrong colors */}
        <div
          style={{
            background: 'lime',
            color: 'magenta',
            padding: '6px 10px',
            fontWeight: 900,
            fontSize: 18,
            fontFamily: 'Papyrus, fantasy',
            border: '3px dotted blue',
            borderRadius: 0,
            transform: 'rotate(-3deg)',
            whiteSpace: 'nowrap',
          }}
        >
          CLICK HERE PLZ
        </div>
      </div>

      {/* Misaligned fine print */}
      <div style={{ position: 'absolute', bottom: 2, right: 8 }}>
        <Text style={{ fontSize: 8, color: 'rgba(255,0,0,0.4)' }}>
          *terms and conditions: there are none. this banner is broken.
        </Text>
      </div>
    </div>
  );
}
