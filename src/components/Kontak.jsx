"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Kontak() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger cards in
      gsap.fromTo(
        ".kontak-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Map fades in with delay
      gsap.fromTo(
        ".kontak-map",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="kontak" ref={sectionRef} className="py-24 bg-[#080808] border-t border-white/5 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 kontak-card">
          <div className="inline-block px-3 py-1 mb-4 rounded-md bg-[#c9a96e]/10 border border-[#c9a96e]/20">
            <span className="text-[#c9a96e] text-sm font-semibold tracking-widest uppercase">Hubungi & Dukung Kami</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Bersama Membangun Masjid
          </h2>
          <p className="text-gray-400 text-lg">
            Setiap langkah kebaikan dimulai dari niat yang tulus
          </p>
        </div>

        {/* ROW 1: INFO KONTAK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* CARD 1 - ALAMAT */}
          <div className="kontak-card bg-[#111111] border border-[#c9a96e]/30 rounded-xl p-8 transition-all duration-300 hover:border-[#c9a96e] hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#c9a96e]/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-[#c9a96e]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Alamat</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Jl. Gn. Anyar Indah No.2 Lantai 1, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294
              </p>
            </div>
            <a 
              href="https://maps.app.goo.gl/oJamkrYQmkLeC3vx7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-[#c9a96e] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider"
            >
              Buka di Google Maps →
            </a>
          </div>

          {/* CARD 2 - WHATSAPP */}
          <div className="kontak-card bg-[#111111] border border-[#c9a96e]/30 rounded-xl p-8 transition-all duration-300 hover:border-[#c9a96e] hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="#25D366" width="28" height="28">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">WhatsApp / Telepon</h3>
              <p className="text-[#25D366] font-mono text-xl mb-1 tracking-wide">0895-3983-85558</p>
              <p className="text-gray-500 text-sm mb-6">Takmir Masjid</p>
            </div>
            <a 
              href="https://wa.me/6289539838555" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300 font-semibold"
            >
              Hubungi via WhatsApp →
            </a>
          </div>

          {/* CARD 3 - DONASI */}
          <div className="kontak-card bg-[#111111] border border-[#c9a96e]/30 rounded-xl p-8 transition-all duration-300 hover:border-[#c9a96e] hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#c9a96e]/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-[#c9a96e]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Donasi & Infaq</h3>
              <p className="text-gray-400 mb-2 leading-relaxed">
                Salurkan donasi terbaik Anda melalui platform terpercaya
              </p>
              <p className="text-[#c9a96e] font-mono mb-6 text-sm">Partner: zakatkita.org</p>
            </div>
            <a 
              href="https://zakatkita.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#d8b87d] transition-colors duration-300 font-bold"
            >
              Donasi Sekarang ↗
            </a>
          </div>

        </div>

        {/* ROW 2: GOOGLE MAPS EMBED */}
        <div className="max-w-6xl mx-auto kontak-map">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-[#c9a96e]" />
            <h3 className="text-2xl font-serif font-bold text-white">Lokasi Kami</h3>
          </div>
          <div className="w-full rounded-xl overflow-hidden border border-[#c9a96e]/30 shadow-2xl bg-[#111111]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.8!2d112.785009!3d-7.332951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf3cc416b77%3A0xd4eac48c19670ca5!2sMasjid%20Nurul%20Hayat!5e0!3m2!1sid!2sid!4v1700000000000" 
              width="100%" 
              className="h-[280px] md:h-[400px]"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}
