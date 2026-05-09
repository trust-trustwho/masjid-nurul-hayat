"use client";

import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";

export default function Hero() {
  const scrollToNext = () => {
    document.getElementById("profil").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Hero Background"
          fill
          unoptimized={true}
          className="object-cover object-center"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 hero-element">
          <MapPin size={16} className="text-gold" />
          <span className="text-sm font-medium tracking-wide text-white">Surabaya, Jawa Timur</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight hero-element">
          Masjid <span className="text-gold">Nurul Hayat</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 font-light mb-12 max-w-2xl mx-auto hero-element">
          Tempat Sucikan Jiwa, Perkuat Ukhuwah
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer" onClick={scrollToNext}>
        <div className="animate-bounce p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:text-gold hover:border-gold transition-colors">
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
}
