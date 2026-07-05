import type {Metadata} from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'; 

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cormorant' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Մովսես & Անահիտ',
  description: 'Օգոստոսի 10, 2026-ին մենք սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր կյանքի ամենակարևոր և գեղեցիկ օրվան՝ մեր հարսանիքին։ Ուզում ենք այս երջանիկ օրը կիսել Ձեզ հետ՝ Ձեր ներկայությամբ այն դարձնելով ավելի ջերմ ու հիշարժան։',
  openGraph: {
    title: 'Մովսես & Անահիտ',
    description: 'Օգոստոսի 10, 2026-ին մենք սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր կյանքի ամենակարևոր և գեղեցիկ օրվան՝ մեր հարսանիքին։ Ուզում ենք այս երջանիկ օրը կիսել Ձեզ հետ՝ Ձեր ներկայությամբ այն դարձնելով ավելի ջերմ ու հիշարժան։',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Մովսես & Անահիտ',
    description: 'Օգոստոսի 10, 2026-ին մենք սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր կյանքի ամենակարևոր և գեղեցիկ օրվան՝ մեր հարսանիքին։ Ուզում ենք այս երջանիկ օրը կիսել Ձեզ հետ՝ Ձեր ներկայությամբ այն դարձնելով ավելի ջերմ ու հիշարժան։',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-[var(--color-wedding-ivory)] text-[var(--color-wedding-dark)] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
