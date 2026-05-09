"use client";

import { useState, useEffect } from "react";

export default function JadwalSholat() {
  const [timings, setTimings] = useState(null);
  const [dateInfo, setDateInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchPrayerTimes = async () => {
    try {
      const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Surabaya&country=Indonesia&method=11");
      const data = await res.json();
      if (data.code === 200) {
        setTimings(data.data.timings);
        setDateInfo(data.data.date);
      }
    } catch (error) {
      console.error("Failed to fetch prayer times", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchPrayerTimes();
    }, 60000);

    // Update current time every second for next prayer calculation
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  const prayers = [
    { id: "Fajr", nameIndo: "Subuh", nameAr: "الفجر" },
    { id: "Dhuhr", nameIndo: "Dzuhur", nameAr: "الظهر" },
    { id: "Asr", nameIndo: "Ashar", nameAr: "العصر" },
    { id: "Maghrib", nameIndo: "Maghrib", nameAr: "المغرب" },
    { id: "Isha", nameIndo: "Isya", nameAr: "العشاء" },
  ];

  // Helper to get next prayer
  const getPrayerStatus = (timeStr) => {
    if (!timeStr) return "future";
    
    const [hours, minutes] = timeStr.split(":");
    const prayerTime = new Date();
    prayerTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    return currentTime > prayerTime ? "past" : "future";
  };

  let nextPrayerFound = false;

  return (
    <section id="jadwal" className="py-24 bg-[#080808] relative border-t border-b border-white/5 section-fade-up">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-md bg-gold/10 border border-gold/20">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Waktu Sholat</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Jadwal Sholat Hari Ini
          </h2>
          
          {loading ? (
            <div className="h-6 w-48 bg-white/10 animate-pulse rounded mx-auto mt-4"></div>
          ) : dateInfo ? (
            <p className="text-gray-400 text-lg">
              {dateInfo.hijri.day} {dateInfo.hijri.month.en} {dateInfo.hijri.year} AH 
              <span className="mx-3 text-gold/50">|</span> 
              {dateInfo.readable}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            // Skeleton Loader
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full sm:w-[180px] h-[160px] bg-white/5 animate-pulse rounded-xl border border-white/10"></div>
            ))
          ) : timings ? (
            prayers.map((prayer) => {
              const time = timings[prayer.id];
              const status = getPrayerStatus(time);
              
              let isNext = false;
              if (status === "future" && !nextPrayerFound) {
                isNext = true;
                nextPrayerFound = true;
              }

              return (
                <div 
                  key={prayer.id}
                  className={`relative w-full sm:w-[180px] p-6 rounded-xl flex flex-col items-center justify-center transition-all duration-500
                    ${isNext ? 'bg-gold/10 border-2 border-gold shadow-[0_0_20px_rgba(201,169,110,0.3)] scale-105' : 'bg-white/5 border border-white/10'}
                    ${status === "past" ? 'opacity-50 grayscale-[50%]' : ''}
                  `}
                >
                  {isNext && (
                    <div className="absolute -top-3 bg-gold text-background text-xs font-bold px-3 py-1 rounded-full">
                      SELANJUTNYA
                    </div>
                  )}
                  <span className="font-serif text-2xl text-gold mb-1">{prayer.nameAr}</span>
                  <span className="text-white font-medium mb-3">{prayer.nameIndo}</span>
                  <span className="text-3xl font-bold text-white font-mono tracking-tight">{time}</span>
                  <span className="text-xs text-gray-500 mt-1">WIB</span>
                </div>
              );
            })
          ) : (
            <div className="text-red-400">Gagal memuat jadwal sholat.</div>
          )}
        </div>
      </div>
    </section>
  );
}
