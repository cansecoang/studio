'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { storySteps, yesButtonPhrases } from './story-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ImageStyle = {
  top: string;
  left: string;
  transform: string;
  width: string;
  height: string;
};

type ImageInfo = {
  style: ImageStyle;
  placeholder: typeof PlaceHolderImages[0];
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [viewState, setViewState] = useState<'story' | 'question' | 'confirmation'>('story');
  const [isFading, setIsFading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // For the question view
  const [noPosition, setNoPosition] = useState({ top: '60%', left: '60%' });
  const [yesScale, setYesScale] = useState(1);
  const [yesTextIndex, setYesTextIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentStory = useMemo(() => storySteps.find(s => s.step === currentStep), [currentStep]);

  const generateImageStyles = useCallback((count: number) => {
    const newImages: ImageInfo[] = [];
    const usedIndices = new Set<number>();

    for (let i = 0; i < count; i++) {
      let placeholderIndex;
      do {
        placeholderIndex = Math.floor(Math.random() * PlaceHolderImages.length);
      } while (usedIndices.has(placeholderIndex));
      usedIndices.add(placeholderIndex);

      const placeholder = PlaceHolderImages[placeholderIndex];
      const rotation = Math.random() * 30 - 15; // -15 to 15 deg
      const size = Math.random() * 10 + 20; // 20vw to 30vw on mobile, clamped on desktop

      let top, left;
      // Distribute images in four quadrants, avoiding the center
      if (i % 4 === 0) { // Top-left
        top = Math.random() * 20;
        left = Math.random() * 35;
      } else if (i % 4 === 1) { // Top-right
        top = Math.random() * 20;
        left = Math.random() * 35 + 65;
      } else if (i % 4 === 2) { // Bottom-left
        top = Math.random() * 25 + 75;
        left = Math.random() * 35;
      } else { // Bottom-right
        top = Math.random() * 25 + 75;
        left = Math.random() * 35 + 65;
      }

      newImages.push({
        placeholder,
        style: {
          top: `${top}%`,
          left: `${left}%`,
          transform: `rotate(${rotation}deg) translate(-50%, -50%)`,
          width: `min(${size}vw, 250px)`,
          height: 'auto',
        },
      });
    }
    return newImages;
  }, []);

  useEffect(() => {
    if (viewState === 'story' && currentStory) {
      setImages(generateImageStyles(currentStory.imageCount));
    }
  }, [currentStep, viewState, currentStory, generateImageStyles]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      if (direction === 'next') {
        if (currentStep < storySteps.length) {
          setCurrentStep(s => s + 1);
        } else if (viewState === 'story') {
          setViewState('question');
        }
      } else {
        if (currentStep > 1) {
          setCurrentStep(s => s - 1);
        }
      }
      setIsFading(false);
    }, 700);
  };
  
  const handleNoInteraction = () => {
    if (viewState !== 'question') return;
    
    // Move "No" button
    setNoPosition({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    });
    
    // Grow "Yes" button and change text
    setYesScale(s => s * 1.15);
    setYesTextIndex(i => (i + 1) % yesButtonPhrases.length);
  };

  const handleYesClick = () => {
    setIsFading(true);
    setTimeout(() => {
      setViewState('confirmation');
      setIsFading(false);
    }, 700);
  };
  
  const renderContent = () => {
    if (!isClient) {
      return null;
    }
    switch (viewState) {
      case 'story':
        return currentStory && (
          <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-700", isFading ? 'opacity-0' : 'opacity-100')}>
            {images.map(({ placeholder, style }, index) => (
              <Card
                key={`${currentStep}-${index}`}
                className="absolute transform-gpu overflow-hidden rounded-lg border-4 border-white bg-white shadow-2xl transition-all duration-500"
                style={{ ...style }}
              >
                <CardContent className="p-0">
                  <Image
                    data-ai-hint={placeholder.imageHint}
                    src={placeholder.imageUrl}
                    alt={`${placeholder.description} (path: ${placeholder.imageUrl})`}
                    width={400}
                    height={300}
                    className="aspect-[4/3] object-cover"
                  />
                </CardContent>
              </Card>
            ))}
            <div className={cn("relative z-20 flex flex-col items-center max-w-md p-4 text-center transition-all duration-700", isFading ? 'fade-out' : 'fade-in')}>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl font-headline">{currentStory.title}</h1>
              <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">{currentStory.text}</p>
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-full bg-white/50 text-foreground backdrop-blur-sm transition-opacity hover:bg-white/75 disabled:opacity-0", isFading && 'opacity-0')}
                  onClick={() => handleNavigation('prev')}
                  disabled={currentStep === 1 || isFading}
                  aria-label="Paso anterior"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-full bg-white/50 text-foreground backdrop-blur-sm transition-opacity hover:bg-white/75", isFading && 'opacity-0')}
                  onClick={() => handleNavigation('next')}
                  disabled={isFading}
                  aria-label="Siguiente paso"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>
        );
      case 'question':
        return (
          <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-700", isFading ? 'opacity-0' : 'opacity-100')}>
            <div className={cn("relative z-10 p-4 text-center", isFading ? 'fade-out' : 'fade-in')}>
               <h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl font-headline">
                Mi corazón de mangoo!!,
                <br />
                ¿quieres ser mi San Valentín?
              </h2>
              <div className="relative mx-auto h-48 w-full max-w-md">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={handleYesClick}
                    className="transform-gpu transition-transform duration-300 ease-out"
                    style={{ transform: `scale(${yesScale})` }}
                    size="lg"
                  >
                    {yesButtonPhrases[yesTextIndex]}
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  className="absolute transform-gpu transition-all duration-300"
                  style={{ top: noPosition.top, left: noPosition.left, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={handleNoInteraction}
                  onClick={handleNoInteraction}
                  size="lg"
                >
                  Do
                </Button>
              </div>
            </div>
          </div>
        );
      case 'confirmation':
        return (
          <div className={cn("absolute inset-0 flex items-center justify-center text-center transition-opacity duration-700", isFading ? 'fade-out' : 'fade-in')}>
            <div className="p-4">
            <h2 className="text-4xl font-bold text-foreground md:text-6xl font-headline">Wwiwiwiwiiwiwiw</h2>
              <h2 className="text-4xl font-bold text-foreground md:text-6xl font-headline">¡Es una cita!</h2>
              <p className="mt-4 text-2xl text-foreground/80 md:text-3xl">Te veo el 14 ❤️</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {renderContent()}
    </div>
  );
}
