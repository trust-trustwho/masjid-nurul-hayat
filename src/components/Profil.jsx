"use client";

import Image from "next/image";

export default function Profil() {
  return (
    <section id="profil" className="py-24 bg-background relative section-fade-up">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1 mb-6 rounded-md bg-gold/10 border border-gold/20">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Tentang Kami</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Cahaya Iman di Tengah Kota
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Masjid Nurul Hayat adalah masjid yang berlokasi di Surabaya, Jawa Timur. Berdiri sebagai pusat ibadah dan kegiatan Islam, masjid ini melayani jamaah dengan penuh keikhlasan dan semangat ukhuwah Islamiyah.
            </p>

            {/* Statistics Highlight Cards */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-4">

              {/* CARD 1 */}
              <div className="border-t-2 border-[#c9a96e] py-4 text-center bg-transparent rounded-none">
                <p className="font-serif text-[1.8rem] text-[#c9a96e] font-bold mb-2">Est. 2001</p>
                <p className="text-white text-[0.65rem] sm:text-xs uppercase tracking-[2px]">Tahun Berdiri</p>
              </div>

              {/* CARD 2 */}
              <div className="border-t-2 border-[#c9a96e] py-4 text-center bg-transparent rounded-none">
                <p className="font-serif text-[1.8rem] text-[#c9a96e] font-bold mb-2">500+</p>
                <p className="text-white text-[0.65rem] sm:text-xs uppercase tracking-[2px]">Jamaah Aktif</p>
              </div>

              {/* CARD 3 */}
              <div className="border-t-2 border-[#c9a96e] py-4 text-center bg-transparent rounded-none">
                <p className="font-serif text-[1.8rem] text-[#c9a96e] font-bold mb-2">10+</p>
                <p className="text-white text-[0.65rem] sm:text-xs uppercase tracking-[2px]">Program Islami</p>
              </div>

            </div>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[650px] w-full rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gold/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <Image
              src="/images/profil.jpg"
              alt="Profil Masjid"
              fill
              unoptimized={true}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-white/5 rounded-full blur-3xl z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
