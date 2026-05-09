import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  onClose: () => void;
}

export default function MatrixRain({ onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01ABCDEFFLAGCYBERSPECTRE@#$%MMU{}[]'.split('');
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4ADE80';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', escHandler);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('keydown', escHandler);
    };
  }, [onClose]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen z-[9999] pointer-events-none"
        style={{ background: 'rgba(0, 0, 0, 0.95)' }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] text-center pointer-events-none"
        style={{
          color: '#4ADE80',
          fontFamily: 'monospace',
          textShadow: '0 0 20px #4ADE80',
          animation: 'fadeOut 5s forwards',
        }}
      >
        <div className="text-5xl font-bold tracking-[0.4em]">SPECTRE MODE</div>
        <div className="mt-4 text-base opacity-70">flag{'{up_up_down_down_left_right}'}</div>
        <div className="mt-6 text-xs opacity-50">submit it on /flags · press ESC to exit</div>
      </div>
    </>
  );
}
