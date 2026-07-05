'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const HERO_BG_IMAGE = '/img/hero.jpg';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-16">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        style={{ y }}
      >
        <Image
          src={HERO_BG_IMAGE}
          alt="Wedding Hero Background"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="z-20 text-center flex flex-col items-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="uppercase tracking-[0.4em] text-sm mb-4 text-wedding-champagne font-sans font-bold drop-shadow-md"
        >
          Մենք ամուսնանում ենք
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-playfair text-6xl md:text-8xl lg:text-[70px] leading-[0.85] mb-8 text-white drop-shadow-lg"
        >
          Մովսես <span className="text-wedding-champagne italic mx-2 drop-shadow-md">&</span> Անահիտ
        </motion.h1>

        <div className="flex items-center gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-16 h-px bg-wedding-champagne origin-right shadow-sm"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-cormorant text-2xl md:text-3xl font-light italic text-white drop-shadow-md"
          >
            Օգոստոսի 10, 2026
          </motion.p>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 text-sm tracking-widest text-white/80 uppercase font-sans font-bold drop-shadow-md"
        >
          Vahagn Hall Ararat, Armenia
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-wedding-champagne drop-shadow-md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
