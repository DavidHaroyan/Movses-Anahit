'use client';
import { useState } from 'react';
import { Hero } from '@/components/hero';
import { Countdown } from '@/components/countdown';
import { Details } from '@/components/details';
import { Timeline } from '@/components/timeline';
import { Gallery } from '@/components/gallery';
import { Rsvp } from '@/components/rsvp';
import { SuccessModal } from '@/components/success-modal';
import { MusicPlayer } from '@/components/music-player';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [brideCodes, setBrideCodes] = useState<number[]>([]);
  const [groomCodes, setGroomCodes] = useState<number[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleRsvpSuccess = (bCodes: number[], gCodes: number[]) => {
    setBrideCodes(bCodes);
    setGroomCodes(gCodes);
    setModalOpen(true);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <main className="min-h-screen bg-wedding-ivory relative selection:bg-wedding-champagne selection:text-white flex flex-col font-serif overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-wedding-champagne z-50 origin-left"
        style={{ scaleX }}
      />
      
      <nav className="fixed top-0 w-full z-40 bg-wedding-ivory/80 backdrop-blur-md border-b border-wedding-champagne/20 flex items-center justify-between px-6 md:px-12 h-16">
        <span className="text-sm tracking-[0.2em] uppercase font-sans font-semibold text-wedding-dark">Մ & Ա</span>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.15em] font-sans font-medium">
          <a href="#story" className="hover:text-wedding-champagne transition-colors">Ժամանակացույց</a>
          <a href="#gallery" className="hover:text-wedding-champagne transition-colors">Մենք</a>
          <a href="#details" className="hover:text-wedding-champagne transition-colors">Մանրամասներ</a>
          <a href="#rsvp" className="text-wedding-champagne border-b border-wedding-champagne transition-colors">Գրանցում</a>
        </div>
        
        {/* <div className="hidden md:flex w-8 h-8 rounded-full border border-wedding-champagne items-center justify-center">
          <div className="w-1 h-1 bg-wedding-champagne rounded-full"></div>
        </div> */}

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-wedding-dark p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 w-full bg-wedding-ivory border-b border-wedding-champagne/20 shadow-xl z-30 md:hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6 text-sm uppercase tracking-[0.15em] font-sans font-medium">
              <a href="#story" onClick={closeMobileMenu} className="hover:text-wedding-champagne transition-colors">Ժամանակացույց</a>
              <a href="#gallery" onClick={closeMobileMenu} className="hover:text-wedding-champagne transition-colors">Մենք</a>
              <a href="#details" onClick={closeMobileMenu} className="hover:text-wedding-champagne transition-colors">Մանրամասներ</a>
              <a href="#rsvp" onClick={closeMobileMenu} className="text-wedding-champagne border-b border-wedding-champagne transition-colors">Գրանցում</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <Countdown />
      <Timeline />
      <Gallery />
      <Details />
      <Rsvp onSuccess={handleRsvpSuccess} />
      
      <footer className="h-16 border-t border-wedding-champagne/10 flex flex-col md:flex-row items-center justify-center md:justify-between px-12 bg-wedding-ivory w-full">
        <p className="text-[9px] uppercase tracking-[0.2em] font-sans opacity-50 text-wedding-dark mb-2 md:mb-0">Օգոստոս 10, 2026</p>
        <p className="text-[9px] uppercase tracking-[0.2em] font-sans opacity-50 text-wedding-dark">Վահագն Հոլլ • Հայաստան</p>
      </footer>

      <SuccessModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        brideCodes={brideCodes} 
        groomCodes={groomCodes} 
      />
      
      <MusicPlayer />
    </main>
  );
}
