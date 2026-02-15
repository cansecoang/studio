'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PeekingCharacterProps {
  onClick: () => void;
}

export default function PeekingCharacter({ onClick }: PeekingCharacterProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "fixed bottom-0 right-8 z-50 cursor-pointer transition-all duration-500 ease-out",
        isHovered ? "translate-y-[-40%]" : "translate-y-[60%]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative w-48 h-60 md:w-56 md:h-72 drop-shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/character-peek.png"
          alt="Character peeking"
          className="w-full h-full object-cover object-top"
          style={{
            objectPosition: 'top center',
          }}
        />
      </div>
    </div>
  );
}
