'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { fleetRecommendations } from '@/lib/data/productionDataset';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { triggerAndroidHaptics } from '@/lib/haptics/androidVibrate';

const hackerScrambleGlyphs = "!@#$%^&*<>_01X#";

export const FleetRecommender: React.FC = () => {
  const { theme, activeRecIndex, setRecommendationIndex } = useChronosStore();
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentRec = fleetRecommendations[activeRecIndex];

  useEffect(() => {
    // Reset state whenever activeRecIndex or theme changes
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDeleting(false);
    setCharIndex(0);
    setDisplayText('');
  }, [activeRecIndex, theme]);

  useEffect(() => {
    const fullText = currentRec.targetName;

    const step = () => {
      if (!isDeleting) {
        setCharIndex((prev) => {
          const nextIndex = prev + 1;
          if (theme === 'hacker' && nextIndex < fullText.length) {
            const scrambleChar = hackerScrambleGlyphs[Math.floor(Math.random() * hackerScrambleGlyphs.length)];
            setDisplayText(fullText.substring(0, nextIndex - 1) + scrambleChar);
          } else {
            setDisplayText(fullText.substring(0, nextIndex));
          }

          if (nextIndex >= fullText.length) {
            setDisplayText(fullText);
            setIsDeleting(true);
            timeoutRef.current = setTimeout(step, 4500); // 4.5s read pause
            return nextIndex;
          }

          const delay = Math.floor(Math.random() * 30) + 45;
          timeoutRef.current = setTimeout(step, delay);
          return nextIndex;
        });
      } else {
        setCharIndex((prev) => {
          const nextIndex = prev - 1;
          setDisplayText(fullText.substring(0, Math.max(0, nextIndex)));

          if (nextIndex <= 0) {
            setIsDeleting(false);
            setRecommendationIndex((activeRecIndex + 1) % fleetRecommendations.length);
            return 0;
          }

          timeoutRef.current = setTimeout(step, 22);
          return nextIndex;
        });
      }
    };

    const initialDelay = setTimeout(step, 100);
    return () => {
      clearTimeout(initialDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isDeleting, activeRecIndex, theme, currentRec.targetName, setRecommendationIndex]);

  const handleActivate = () => {
    triggerAndroidHaptics([80, 40, 80]);
    confetti({ particleCount: 50, spread: 70 });
  };

  const getPrefix = () => {
    if (theme === 'hacker') return '[EXEC_SELECT]:';
    if (theme === 'obsidian') return 'Rekomendasi:';
    return 'Gunakan:';
  };

  const getCursorSymbol = () => {
    if (theme === 'hacker') return '█';
    return '|';
  };

  const getTargetClass = () => {
    if (theme === 'hacker') return 'underline decoration-green-400 text-green-400 font-mono font-bold tracking-tight';
    if (theme === 'obsidian') return 'underline decoration-emerald-400 text-emerald-400 font-bold tracking-tight';
    return 'underline decoration-wavy decoration-rose-400 font-black tracking-tight text-rose-600 dark:text-rose-400';
  };

  return (
    <div className="border-beam-box">
      <div className="border-beam-content p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border-2 border-rose-300 flex items-center justify-center text-rose-500 text-2xl font-bold flex-shrink-0">
            <span>⭐</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="pill-badge px-2.5 py-0.5 text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-500 inline" />
                <span>Rekomendasi Pintar</span>
              </span>
              <span className="text-xs opacity-75 font-semibold">{currentRec.statusTag}</span>
            </div>
            <h3 className="text-lg font-black mt-1 min-h-[32px] flex items-center flex-wrap gap-1.5" id="recommender-headline">
              <span className="opacity-90 font-bold">{getPrefix()}</span>
              <span className={getTargetClass()}>{displayText}</span>
              <span className={`typewriter-cursor ${theme === 'hacker' ? 'hacker-cursor' : theme === 'obsidian' ? 'obsidian-cursor' : 'cute-cursor'}`}>
                {getCursorSymbol()}
              </span>
            </h3>
            <p className="text-xs opacity-80 min-h-[18px] transition-opacity duration-300">{currentRec.desc}</p>
          </div>
        </div>

        <button
          onClick={handleActivate}
          className="squishy-btn px-5 py-2.5 bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-md flex-shrink-0"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Gunakan Akun Ini Sekarang</span>
        </button>
      </div>
    </div>
  );
};
