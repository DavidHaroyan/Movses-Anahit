'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, X, CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  brideCodes: number[];
  groomCodes: number[];
}

export function SuccessModal({ isOpen, onClose, brideCodes, groomCodes }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-wedding-champagne/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-wedding-beige/60 rounded-full blur-3xl pointer-events-none" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="font-playfair text-3xl text-wedding-dark mb-4">Գրանցումն հաստատվեց</h2>
              <p className="font-sans text-gray-600 mb-8">
                Շնորհակալություն գրանցման համար։ Մենք անհամբեր սպասում ենք Ձեզ տեսնել մեր հարսանիքին և կիսել այս ուրախ օրը միասին։
              </p>

              {(brideCodes.length > 0 || groomCodes.length > 0) && (
                <div className="bg-wedding-ivory rounded-2xl p-6 border border-wedding-champagne/50">
                  <h3 className="font-cormorant text-2xl text-wedding-champagne mb-2 flex items-center justify-center">
                    <Ticket className="w-5 h-5 mr-2" />
                    Ձեր Հատուկ Կոդը
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 italic">* Պահպանեք այս կոդը մասնակցելու համար</p>
                  
                  <div className="space-y-4">
                    {brideCodes.length > 0 && (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-wedding-dark/60 font-bold block mb-2">Հարսի կոդ</span>
                        <div className="flex flex-wrap justify-center gap-2">
                          {brideCodes.map(c => (
                            <span key={c} className="px-4 py-2 bg-pink-50 text-pink-700 rounded-lg font-mono font-bold border border-pink-200">
                              B-{c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {groomCodes.length > 0 && (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-wedding-dark/60 font-bold block mb-2 pt-2 border-t border-gray-200">Փեսայի կոդ</span>
                        <div className="flex flex-wrap justify-center gap-2">
                          {groomCodes.map(c => (
                            <span key={c} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-mono font-bold border border-blue-200">
                              G-{c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button 
                onClick={onClose}
                className="mt-8 w-full py-4 bg-wedding-champagne text-white rounded-full font-sans tracking-widest uppercase text-[10px] sm:text-xs font-bold hover:bg-wedding-champagne/90 transition-colors shadow-lg shadow-wedding-champagne/20"
              >
                Փակել
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
