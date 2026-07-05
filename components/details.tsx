'use client';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function Details() {
  return (
    <section className="py-24 bg-wedding-beige border-b border-wedding-champagne/10" id="details">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-dark mb-4">Մանրամասներ</h2>
          <div className="w-16 h-px bg-wedding-champagne mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-wedding-champagne mt-1 shrink-0" />
              <div>
                <h3 className="font-playfair text-2xl mb-2 text-wedding-dark">Վահագն Հոլլ</h3>
                <p className="font-sans text-gray-600">Վահագն Հոլլ Ռեստորանային Համալիր</p>
                <p className="font-sans text-gray-500 mt-2 text-sm max-w-sm leading-relaxed">
                  Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր կյանքի ամենակարևոր և գեղեցիկ օրվան՝ մեր հարսանիքին։ Ուզում ենք այս երջանիկ պահը կիսել Ձեզ հետ՝ Ձեր ներկայությամբ այն դարձնելով ավելի ջերմ ու հիշարժան։ Սպասում ենք Ձեզ՝ սիրով, ուրախությամբ և լավագույն մաղթանքներով լի այս օրը միասին նշելու։
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Calendar className="w-6 h-6 text-wedding-champagne mt-1 shrink-0" />
              <div>
                <h3 className="font-playfair text-2xl mb-2 text-wedding-dark">Օգոստոսի 10, 2026</h3>
                <p className="font-sans text-gray-600">Երկուշաբթի</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-wedding-champagne mt-1 shrink-0" />
              <div>
                <h3 className="font-playfair text-2xl mb-2 text-wedding-dark">17։30</h3>
                <p className="font-sans text-gray-600">Արարողության մեկնարկ</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-2xl relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1228.5870868550232!2d44.660028400801!3d39.8688919551937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40153100381f02cd%3A0x9e5cd309742274b9!2z1Y7VodWw1aHVo9W2INWA1bjVrNWsINWM1aXVvdW_1bjWgNWh1bbVodW11avVtiDVgNWh1bTVodWs1avWgA!5e1!3m2!1shy!2sam!4v1783274004931!5m2!1shy!2sam"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
