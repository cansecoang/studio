'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import FallingHearts from './falling-hearts';

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SPECIAL_DATE = new Date('2025-04-20T00:00:00');

function calculateTimeElapsed(startDate: Date, currentDate: Date): TimeLeft {
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();
  let hours = currentDate.getHours() - startDate.getHours();
  let minutes = currentDate.getMinutes() - startDate.getMinutes();
  let seconds = currentDate.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  const totalMonths = years * 12 + months;

  return {
    months: totalMonths,
    days,
    hours,
    minutes,
    seconds,
  };
}

interface SecretSectionProps {
  isVisible: boolean;
}

export default function SecretSection({ isVisible }: SecretSectionProps) {
  const [timeElapsed, setTimeElapsed] = useState<TimeLeft>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeElapsed(calculateTimeElapsed(SPECIAL_DATE, now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 transition-transform duration-1000 ease-in-out z-40",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <FallingHearts />
      
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-8">
          {/* Counter */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-rose-800 mb-6 font-headline">
              Llevamos juntoooooooooooooosss...
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold text-rose-800 mb-6 font-headline">
              exactamenteeeeeee!!!!
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
              <TimeUnit value={timeElapsed.months} label="Meses" />
              <TimeUnit value={timeElapsed.days} label="Días" />
              <TimeUnit value={timeElapsed.hours} label="Horas" />
              <TimeUnit value={timeElapsed.minutes} label="Minutos" />
              <TimeUnit value={timeElapsed.seconds} label="Segundos" />
            </div>

            <p className="text-lg md:text-2xl text-rose-700 max-w-2xl mx-auto leading-relaxed italic font-medium">
              desde que nos conocemos, y muchos más nos esperan.<br />
              Te amo hoy, mañana y siempre.<br />
              <span className="text-xl md:text-3xl font-bold">Atte. el chamaco ❤️</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border-2 border-rose-200 min-w-[80px] md:min-w-[100px]">
      <div className="text-3xl md:text-5xl font-bold text-rose-600 mb-1">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-rose-700 font-medium">
        {label}
      </div>
    </div>
  );
}
