import { cn } from '@/lib/utils';

type Doodle = {
  path: string;
  style: React.CSSProperties;
  viewBox?: string;
};

const doodles: Doodle[] = [
  {
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    style: { top: '10%', left: '15%', transform: 'rotate(-15deg) scale(1.2)', width: '40px', height: '40px', opacity: 0.2 },
  },
  {
    path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    style: { top: '80%', left: '10%', transform: 'rotate(20deg)', width: '30px', height: '30px', opacity: 0.15 },
  },
  {
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    style: { top: '5%', right: '12%', transform: 'rotate(10deg)', width: '25px', height: '25px', opacity: 0.25 },
  },
  {
    path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    style: { top: '25%', left: '90%', transform: 'rotate(-5deg) scale(0.8)', width: '35px', height: '35px', opacity: 0.1 },
  },
  {
    path: 'M2,13.159V21.84h8.681L15,17.5l-4.319-4.341H2z M17.681,2H9L13.319,6.341L22,15.021V6.341L17.681,2z',
    style: { top: '85%', right: '20%', transform: 'rotate(30deg)', width: '30px', height: '30px', opacity: 0.2 },
    viewBox: '0 0 24 24',
  },
  {
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    style: { bottom: '5%', left: '45%', transform: 'rotate(5deg) scale(0.7)', width: '28px', height: '28px', opacity: 0.15 },
  },
   {
    path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    style: { top: '55%', left: '5%', transform: 'rotate(-10deg) scale(1.1)', width: '22px', height: '22px', opacity: 0.2 },
  },
  {
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    style: { top: '40%', left: '50%', transform: 'translate(-50%, -50%) rotate(0deg) scale(1.5)', width: '50px', height: '50px', opacity: 0.05 },
  },
];

const DoodleBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">
      {doodles.map((doodle, i) => (
        <svg
          key={i}
          className="absolute text-primary"
          style={doodle.style}
          viewBox={doodle.viewBox || '0 0 24 24'}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={doodle.path} />
        </svg>
      ))}
    </div>
  );
};

export default DoodleBackground;
