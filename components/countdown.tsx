'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export function Countdown() {
  const targetDate = new Date('2026-08-10T16:00:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft({
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Օր', value: timeLeft.days },
    { label: 'Ժամ', value: timeLeft.hours },
    { label: 'Րոպե', value: timeLeft.minutes },
    { label: 'Վարկյան', value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 bg-wedding-ivory border-b border-wedding-champagne/10">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
          {timeBlocks.map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl md:text-6xl font-light mb-1 font-playfair">{block.value}</span>
              <span className="text-[9px] uppercase tracking-widest text-wedding-champagne font-sans">{block.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
