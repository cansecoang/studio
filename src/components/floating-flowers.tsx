import { cn } from '@/lib/utils';
import React from 'react';

const FlowerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn('text-primary', className)}
  >
    <path d="M12 2C9.24 2 7 4.24 7 7c0 1.54.69 2.9 1.76 3.83C7.29 11.58 6 12.9 6 14.5c0 2.48 2.02 4.5 4.5 4.5h3c2.48 0 4.5-2.02 4.5-4.5 0-1.6-1.29-2.92-2.76-3.67C16.31 9.9 17 8.54 17 7c0-2.76-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zm-1.5 8h3c1.38 0 2.5 1.12 2.5 2.5S14.88 17 13.5 17h-3c-1.38 0-2.5-1.12-2.5-2.5S9.12 12 10.5 12z" />
  </svg>
);

const FloatingFlowers = () => {
  const flowers = React.useMemo(() => Array.from({ length: 15 }), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">
      {flowers.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationName: 'float-up',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDuration: `${Math.random() * 10 + 15}s`,
          animationDelay: `${Math.random() * 20}s`,
        };
        const size = Math.random() * 1.5 + 1; // 1rem to 2.5rem
        const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7

        return (
          <div
            key={i}
            className="absolute bottom-[-10vh]"
            style={style}
          >
            <FlowerIcon
              className="animate-spin"
              style={{
                width: `${size}rem`,
                height: `${size}rem`,
                opacity,
                animationDuration: `${Math.random() * 20 + 10}s`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingFlowers;
