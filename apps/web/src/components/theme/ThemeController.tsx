'use client';

import React, { useEffect, useRef } from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { AppThemeType } from '@/lib/supabase/types';

export const ThemeController: React.FC = () => {
  const { theme, setTheme } = useChronosStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const matrixIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    // Handle matrix digital rain when theme is hacker
    if (theme === 'hacker') {
      startMatrixRain();
    } else {
      stopMatrixRain();
    }

    return () => stopMatrixRain();
  }, [theme]);

  const startMatrixRain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = Math.floor(canvas.width / 14);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.floor(Math.random() * -100);

    const characters = '0123456789ABCDEFﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    if (!matrixIntervalRef.current) {
      matrixIntervalRef.current = setInterval(draw, 33);
    }
  };

  const stopMatrixRain = () => {
    if (matrixIntervalRef.current) {
      clearInterval(matrixIntervalRef.current);
      matrixIntervalRef.current = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        id="matrix-canvas"
        className={`fixed inset-0 pointer-events-none z-[-1] ${theme === 'hacker' ? 'block' : 'hidden'}`}
      />
    </>
  );
};
