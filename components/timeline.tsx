'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Heart, MapPin } from 'lucide-react';

const events = [
  { id: 1, time: '10:00', title: 'Փեսայի տուն', location: 'Ք․ Արտաշատ, Մարքսի փ․ 90 տ․', url: 'https://maps.app.goo.gl/eSYFYTE2R4MGqM1i8' },
  { id: 2, time: '12:00', title: 'Հարսի տուն', location: 'Գ․ Մրգավան, Խ․ Բադալյան փ․ 55 տ․ ', url: 'https://maps.app.goo.gl/1zAADdHuDvz5d2XA8' },
  { id: 3, time: '15:00', title: 'Եկեղեցի', location: 'Արտաշատի Ս․ Հովհաննես եկեղեցի', url: 'https://maps.app.goo.gl/uHsNByittfKxiG9V9' },
  { id: 4, time: '16:30', title: 'Փեսայի տուն', location: 'Ք․ Արտաշատ, Մարքսի փ․ 90 տ․', url: 'https://maps.app.goo.gl/eSYFYTE2R4MGqM1i8' },
  { id: 5, time: '17:30', title: 'Վահագն Հոլլ Ռեստորան', location: 'Գ․ Այգավան Թումանյան փ․ 29 ', url: 'https://maps.app.goo.gl/RWjDbYSQQ5Ef8Q9CA' },
];

export function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-16 md:py-24 bg-wedding-beige relative overflow-hidden border-b border-wedding-champagne/10" id="story">
      <div className="max-w-5xl mx-auto px-4 relative" ref={containerRef}>
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-sm md:text-base uppercase tracking-widest text-wedding-champagne font-sans font-bold mb-4 text-center">Ժամանակացույց</h3>
        </div>

        <div className="relative w-full max-w-[340px] md:max-w-3xl mx-auto">
          {/* Background SVG wavy line visible on both mobile and desktop */}
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <svg className="w-12 md:w-24 h-full" viewBox="0 0 100 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M50 0 C 90 125, 90 125, 50 250 C 10 375, 10 375, 50 500 C 90 625, 90 625, 50 750 C 10 875, 10 875, 50 1000" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
              <motion.path 
                d="M50 0 C 90 125, 90 125, 50 250 C 10 375, 10 375, 50 500 C 90 625, 90 625, 50 750 C 10 875, 10 875, 50 1000" 
                stroke="#C5A059" 
                strokeWidth="2" 
                fill="none"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-12 md:space-y-24 relative z-10 py-4">
            {events.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={event.id}
                  className={`flex items-center w-full relative ${isEven ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Heart on the line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-10 md:h-10 bg-wedding-beige rounded-full flex items-center justify-center border border-wedding-champagne/50 z-20 shadow-sm">
                    <Heart className="w-3.5 h-3.5 md:w-5 md:h-5 text-wedding-champagne fill-wedding-champagne/20" />
                  </div>

                  {/* Event card */}
                  <div className={`w-[45%] md:w-[42%] flex flex-col ${isEven ? 'items-end text-right pr-4 md:pr-12' : 'items-start text-left pl-4 md:pl-12'}`}>
                     <p className="font-sans font-bold text-xs md:text-sm uppercase tracking-widest text-wedding-dark">{event.time}</p>
                     <p className="font-cormorant italic text-xl md:text-3xl text-wedding-champagne mt-1 md:mt-2 leading-tight">{event.title}</p>
                     
                     <a 
                       href={event.url} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="inline-flex items-center gap-1.5 mt-3 text-[10px] md:text-[13px] font-sans text-gray-400 hover:text-wedding-champagne transition-colors group"
                     >
                       <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:text-wedding-champagne transition-colors shrink-0" />
                       <span className={`border-b border-transparent group-hover:border-wedding-champagne transition-colors ${isEven ? 'text-right' : 'text-left'}`}>{event.location}</span>
                     </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
