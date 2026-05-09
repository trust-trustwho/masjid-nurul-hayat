/* eslint-disable @next/next/no-img-element */
"use client";

export default function Kegiatan() {
  const kegiatanList = [
    { src: "/images/kegiatan-1.jpg", caption: "Kajian Fiqih" },
    { src: "/images/kegiatan-2.jpg", caption: "Khotbah Jumat" },
    { src: "/images/kegiatan-3.jpg", caption: "Kajian Tafsir Tematik" },
    { src: "/images/kegiatan-4.jpg", caption: "Kajian Kitab Al-Hikam" },
    { src: "/images/kegiatan-5.jpg", caption: "Gema Idul Adha" },
    { src: "/images/kegiatan-6.jpg", caption: "Berbagi Berkah: Momen Takjil & Buka Puasa" },
  ];

  return (
    <section id="kegiatan" className="py-24 bg-background relative section-fade-up">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-md bg-gold/10 border border-gold/20">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Kegiatan</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Kegiatan Masjid Nurul Hayat
          </h2>
          <p className="text-gray-400 text-lg">
            Berbagai kegiatan islami yang rutin diselenggarakan
          </p>
        </div>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-w-5xl mx-auto">
          {kegiatanList.map((item, index) => (
            <div key={index} className="relative aspect-square overflow-hidden group bg-white/5 flex items-center justify-center">
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.classList.remove('hidden');
                  e.target.nextElementSibling.classList.add('flex');
                }}
              />
              
              {/* Fallback Mosque Icon */}
              <div className="absolute inset-0 flex-col items-center justify-center bg-[#0a0a0a] hidden">
                <svg viewBox="0 0 400 150" fill="#c9a96e" className="w-24 h-24 opacity-50">
                  <ellipse cx="200" cy="60" rx="50" ry="55"/>
                  <rect x="150" y="60" width="100" height="80"/>
                  <rect x="100" y="30" width="20" height="110"/>
                  <polygon points="100,30 110,5 120,30"/>
                  <rect x="280" y="30" width="20" height="110"/>
                  <polygon points="280,30 290,5 300,30"/>
                  <ellipse cx="140" cy="75" rx="25" ry="28"/>
                  <ellipse cx="260" cy="75" rx="25" ry="28"/>
                  <rect x="50" y="138" width="300" height="4" rx="2"/>
                </svg>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-white text-[0.9rem] text-center px-6 font-medium leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Link Button */}
        <div className="mt-16 text-center">
          <a
            href="https://www.instagram.com/masjidnurulhayat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-none border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300 font-semibold tracking-wide"
          >
            Lihat Lebih Banyak di Instagram ↗
          </a>
        </div>

      </div>
    </section>
  );
}
