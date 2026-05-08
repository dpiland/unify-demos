/**
 * TestBanner Component — Intentionally Broken
 *
 * This banner is deliberately ugly and broken to demo a "bad deploy" scenario.
 * The glitch: the $300 amount rapidly accelerates out of control.
 * The talk track: "A dev pushed this broken banner to production. Instead of
 * a hotfix and redeploy, we just toggle the flag off — instant rollback."
 */

import { Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;

export function TestBanner() {
  const [amount, setAmount] = useState(300);

  useEffect(() => {
    // Rapidly accelerating interval - starts at 100ms, gets faster
    let intervalTime = 100;
    let currentAmount = 300;

    const accelerate = () => {
      const interval = setInterval(() => {
        currentAmount += Math.floor(Math.random() * 50) + 25; // Random increment 25-75
        setAmount(currentAmount);

        // Make it faster each time
        intervalTime = Math.max(10, intervalTime - 5);
        clearInterval(interval);

        if (intervalTime > 10) {
          setTimeout(accelerate, intervalTime);
        }
      }, intervalTime);
    };

    // Start after 500ms delay
    const timeout = setTimeout(accelerate, 500);

    return () => clearTimeout(timeout);
  }, []);

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
            Receive{' '}
            <span
              style={{
                display: 'inline-block',
                animation: 'glitch 0.3s infinite',
              }}
            >
              ${amount.toLocaleString()}
            </span>{' '}
            when you add any new service! 🎉
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
            LIMITED TIME OFFER!!! ACT NOW!!!
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
          ADD SERVICE
        </div>
      </div>

      {/* Misaligned fine print */}
      <div style={{ position: 'absolute', bottom: 2, right: 8 }}>
        <Text style={{ fontSize: 8, color: 'rgba(255,0,0,0.4)' }}>
          *offer amount may vary. significantly.
        </Text>
      </div>

      {/* Add glitch animation */}
      <style>
        {`
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }
        `}
      </style>
    </div>
  );
}
