import { useEffect, useState } from 'react';
import { KONAMI_CODE } from '../constants';
import MatrixRain from './MatrixRain';

export default function KonamiCodeWatcher() {
  const [showRain, setShowRain] = useState(false);

  useEffect(() => {
    let buf: string[] = [];

    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.push(key);
      if (buf.length > KONAMI_CODE.length) buf.shift();
      if (buf.length === KONAMI_CODE.length && buf.every((k, i) => k === KONAMI_CODE[i])) {
        setShowRain(true);
        buf = [];
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return showRain ? <MatrixRain onClose={() => setShowRain(false)} /> : null;
}
