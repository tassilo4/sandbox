'use client';

import { useEffect, useRef, useState } from 'react';

const SCRAMBLE_CHARS = '!#$%&*+-/<=>?@[]^_{|}~—\\';
const WINDOW_SIZE = 4;
const STEP_MS = 25;

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const len = text.length;
    const totalSteps = len + WINDOW_SIZE - 1;
    let k = 0;

    intervalRef.current = setInterval(() => {
      if (k >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(text);
        return;
      }
      const windowEnd = Math.min(k, len - 1);
      const windowStart = Math.max(0, k - WINDOW_SIZE + 1);
      let out = '';
      for (let i = 0; i < len; i++) {
        out += i >= windowStart && i <= windowEnd ? randomChar() : text[i];
      }
      setDisplay(out);
      k++;
    }, STEP_MS);
  };

  return <span onMouseEnter={startScramble}>{display}</span>;
}

export default function GriffinButtonsPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0b] flex items-center justify-center p-8">
      <style>{`
        @font-face {
          font-family: 'Sohne';
          src: url('/fonts/sohne-roman-1ko8b9k.woff2') format('woff2');
          font-style: normal;
          font-weight: 200 900;
          font-display: swap;
        }

        @font-face {
          font-family: 'Sohne';
          src: url('/fonts/sohne-kursiv-zelx4z.woff2') format('woff2');
          font-style: italic;
          font-weight: 200 900;
          font-display: swap;
        }

        @font-face {
          font-family: 'Sohne Mono';
          src: url('/fonts/sohne-mono-buch-tq5ze9.woff2') format('woff2');
          font-style: normal;
          font-weight: 400;
          font-display: swap;
        }

        .button-link {
          z-index: 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          overflow: clip;
          font-family: 'Sohne Mono', ui-monospace, monospace;
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          user-select: none;
          white-space: nowrap;
          padding: 8px 14px;
          border: none;
          cursor: pointer;
        }

        .button-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: 100% center;
          transition: transform 0.3s;
        }

        .button-link:hover::before {
          transform: scaleX(1);
          transform-origin: 0 center;
        }

        .button-link > svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .button-link > svg:last-child {
          margin-right: -4px;
        }

        .button-link-accent {
          background-color: #e6e1d9;
          color: #0c0c0b;
        }

        .button-link-accent::before {
          background-color: #fdfcf9;
        }

        .button-link-default {
          background-color: #0c0c0b;
          color: #f9f5ef;
          box-shadow: inset 0 0 0 1px #363533;
        }

        .button-link-default::before {
          background-color: #363533;
        }

        @media (min-width: 60em) {
          .button-link {
            padding: 12px 20px;
            gap: 6px;
          }
        }
      `}</style>

      <div className="flex items-center gap-4">
        <a href="https://app.griffin.com/register" className="button-link button-link-accent">
          <ScrambleText text="Try for free" />
          <svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
          </svg>
        </a>
        <a href="#" className="button-link button-link-default">
          <ScrambleText text="Contact sales" />
        </a>
      </div>
    </div>
  );
}
