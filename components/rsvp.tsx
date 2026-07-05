'use client';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Plus, Trash2, Heart } from 'lucide-react';

const formSchema = z.object({
  honeyPot: z.string().max(0, "Bots only"),
  participants: z.array(z.object({
    fullName: z.string().min(2, "Full name required"),
    gender: z.enum(["Male", "Female"]),
    maritalStatus: z.enum(["Unmarried", "Married"])
  })).min(1, "At least one participant required")
});

type FormData = z.infer<typeof formSchema>;

export function Rsvp({ onSuccess }: { onSuccess: (brideCodes: number[], groomCodes: number[]) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      honeyPot: "",
      participants: [{ fullName: "", gender: "Female", maritalStatus: "Unmarried" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants"
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeyPot) return; 
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const resp = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const resData = await resp.json();
      if (!resp.ok) throw new Error(resData.error || "Failed to submit RSVP");
      
      onSuccess(resData.brideCodes || [], resData.groomCodes || []);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-wedding-ivory" id="rsvp">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-dark mb-4">Ծաղկեփնջի ավանդույթ</h2>
          <p className="font-sans text-gray-600 mb-6">խնդրում ենք անպայման գրանցվել մասնակցության համար</p>
          <div className="w-16 h-px bg-wedding-champagne mx-auto" />
        </div>

        <div className="bg-white/40 backdrop-blur-sm border border-wedding-champagne/10 rounded-3xl p-6 md:p-12 shadow-xl mx-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
            <input type="hidden" {...register("honeyPot")} />

            <div className="space-y-6">
              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div 
                    key={field.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 border border-wedding-champagne/20 rounded-xl bg-wedding-beige/50 space-y-4 relative"
                  >
                    <div className="flex justify-between items-center mb-2">
                       <h4 className="font-playfair text-lg text-wedding-dark">Հյուր {index + 1}</h4>
                       {fields.length > 1 && (
                         <button type="button" onClick={() => remove(index)} className="text-gray-400 hover:text-red-500 transition-colors">
                           <Trash2 className="w-5 h-5" />
                         </button>
                       )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Անուն ազգանուն</label>
                      <input 
                        {...register(`participants.${index}.fullName`)} 
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-champagne focus:ring-1 focus:ring-wedding-champagne outline-none transition-colors bg-white font-sans"
                        placeholder="Անուն ազգանուն"
                      />
                      {errors.participants?.[index]?.fullName && <p className="text-red-500 text-xs mt-1">{errors.participants[index].fullName.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Սեռ</label>
                        <select 
                          {...register(`participants.${index}.gender`)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-champagne focus:ring-1 focus:ring-wedding-champagne outline-none transition-colors bg-white font-sans"
                        >
                          <option value="Female">Իգական</option>
                          <option value="Male">Արական</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Ամուսնական կարգավիճակ</label>
                        <select 
                          {...register(`participants.${index}.maritalStatus`)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-champagne focus:ring-1 focus:ring-wedding-champagne outline-none transition-colors bg-white font-sans"
                        >
                          <option value="Unmarried">Չամուսնացած</option>
                          <option value="Married">Ամուսնացած</option>
                        </select>
                      </div>
                    </div>
                    
                    <p className="text-xs text-wedding-champagne/80 italic font-sans mt-2">
                      * խնդրում ենք անպայման գրանցվել մասնակցության համար
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => append({ fullName: "", gender: "Female", maritalStatus: "Married" })}
              className="flex items-center justify-center w-full py-4 border-2 border-dashed border-wedding-champagne border-opacity-40 rounded-xl text-wedding-champagne hover:bg-wedding-champagne/10 transition-colors font-sans text-sm tracking-widest uppercase"
            >
              <Plus className="w-4 h-4 mr-2" /> Ավելացնել հյուր
            </button>

            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-wedding-champagne text-white rounded-full font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-wedding-champagne/90 shadow-lg shadow-wedding-champagne/20 transition-all disabled:opacity-50 flex justify-center items-center group"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <span className="flex items-center">
                  Հաստատել
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
