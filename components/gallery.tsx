'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/img/1.jpg',
  '/img/4.jpg',
  '/img/3.jpg',
];

export function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // const handleNext = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (selectedIdx !== null) {
  //     setSelectedIdx((selectedIdx + 1) % images.length);
  //   }
  // };

  // const handlePrev = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (selectedIdx !== null) {
  //     setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  //   }
  // };

  return (
    <section className="py-24 bg-wedding-ivory border-b border-wedding-champagne/10" id="gallery">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-dark mb-4">Մենք</h2>
          <div className="w-16 h-px bg-wedding-champagne mx-auto" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              // onClick={() => setSelectedIdx(idx)}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img src={src} alt="Gallery" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            // onClick={() => setSelectedIdx(null)}
          >
            {/* <button className="absolute top-6 right-6 text-white/70 hover:text-white z-50" onClick={() => setSelectedIdx(null)}>
              <X className="w-8 h-8" />
            </button>

            <button className="absolute left-6 text-white/50 hover:text-white p-4" onClick={handlePrev}>
              <ChevronLeft className="w-12 h-12" />
            </button> */}

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              key={selectedIdx}
              src={images[selectedIdx]}
              alt="Fullscreen"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              // onClick={(e) => e.stopPropagation()}
            />

            {/* <button className="absolute right-6 text-white/50 hover:text-white p-4" onClick={handleNext}>
              <ChevronRight className="w-12 h-12" />
            </button> */}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
