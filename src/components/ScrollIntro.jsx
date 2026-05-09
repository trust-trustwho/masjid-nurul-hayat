"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quotesData = [
  { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", id: "Sesungguhnya bersama kesulitan ada kemudahan", src: "— QS. Al-Insyirah: 6" },
  { ar: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", id: "Jadikanlah sabar dan sholat sebagai penolongmu", src: "— QS. Al-Baqarah: 45" },
  { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", id: "Maka sesungguhnya bersama kesulitan ada kemudahan", src: "— QS. Al-Insyirah: 5" },
  { ar: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", id: "Barangsiapa bertakwa kepada Allah, Dia akan memberinya jalan keluar", src: "— QS. At-Talaq: 2" },
];

const lanternConfigs = [
  { mLeft: "20%", dLeft: "10%", stringH: "h-12", speed: 3.0, hideOnMobile: false },
  { mLeft: "0%",  dLeft: "28%", stringH: "h-32", speed: 3.7, hideOnMobile: true },
  { mLeft: "50%", dLeft: "50%", stringH: "h-16", speed: 4.2, hideOnMobile: false },
  { mLeft: "0%",  dLeft: "72%", stringH: "h-40", speed: 3.4, hideOnMobile: true },
  { mLeft: "80%", dLeft: "90%", stringH: "h-24", speed: 4.8, hideOnMobile: false },
];

export default function ScrollIntro() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Initial check for mobile size
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Generate stars on mount
    const generatedStars = Array.from({ length: 80 }).map(() => ({
      left: `${Math.random() * 95 + 2}%`, // Prevent edge overflow
      top: `${Math.random() * 80}%`, // keep mostly in sky
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    if (stars.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Lantern Swaying
      lanternConfigs.forEach((config, i) => {
        gsap.set(`.lantern-${i}`, { rotation: -8, transformOrigin: "top center" });
        gsap.to(`.lantern-${i}`, {
          rotation: 8,
          duration: config.speed,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 2. Stars Twinkling
      gsap.to(".star-twinkle", {
        opacity: (i, target) => parseFloat(target.style.opacity) * 0.2,
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 2, from: "random" }
      });

      // 3. Scroll Prompt Bounce
      gsap.to(".scroll-prompt", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut"
      });

      // 4. Main Scroll Timeline
      const scrollHeight = window.innerWidth < 768 ? "+=300%" : "+=400%";
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: scrollHeight,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // We use a dummy tween of duration 100 to map percentages easily
      tl.to({}, { duration: 100 });

      // Parallax Effects
      tl.to(".parallax-moon", { y: -30, opacity: 0.8, duration: 100, ease: "none" }, 0);
      tl.to(".parallax-stars", { y: -100, duration: 100, ease: "none" }, 0);
      tl.to(".parallax-lanterns", { y: -40, duration: 100, ease: "none" }, 0);
      
      // Scroll prompt fade out
      tl.to(".scroll-prompt", { opacity: 0, duration: 5, ease: "none" }, 0);

      // Quotes Sequence
      const quotesMap = [
        { start: 0, end: 25 },
        { start: 25, end: 50 },
        { start: 50, end: 75 },
        { start: 75, end: 100 },
      ];

      quotesMap.forEach((q, i) => {
        const qDuration = q.end - q.start;
        const fadeIn = qDuration * 0.3;
        const hold = qDuration * 0.4;
        const fadeOut = qDuration * 0.3;

        tl.fromTo(`.quote-${i}`, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: fadeIn, ease: "power1.out" }, 
          q.start
        );
        tl.to(`.quote-${i}`, 
          { opacity: 0, y: -30, duration: fadeOut, ease: "power1.in" }, 
          q.start + fadeIn + hold
        );
      });

      // Transition to Hero
      // Fade out all ornaments/night elements at the end
      tl.to(".night-elements", { opacity: 0, duration: 5, ease: "none" }, 95);
      
      // Screen goes fully dark
      tl.to(".dark-overlay", { opacity: 1, duration: 5, ease: "none" }, 95);

    }, containerRef);

    return () => ctx.revert();
  }, [stars]);

  return (
    <div ref={triggerRef} className="w-[100vw] max-w-[100%] h-screen overflow-hidden overflow-x-hidden text-white relative">
      {/* Deep Night Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#0a0612_0%,#1a0f2e_40%,#0d1a2e_70%,#050a0f_100%)] night-elements" />

      <div ref={containerRef} className="w-full h-full relative z-10">
        
        {/* Stars Container */}
        <div className="absolute inset-0 parallax-stars night-elements overflow-hidden w-[100vw]">
          {stars.map((star, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full star-twinkle"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        {/* Moon & Light Rays */}
        <div className="absolute top-[10%] right-[5%] md:top-[8%] md:right-[8%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] parallax-moon night-elements">
          {/* Light Rays */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[150vw] h-[40px] bg-gradient-to-l from-[#c9a96e]/5 to-transparent origin-right -rotate-[15deg] right-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[120vw] h-[80px] bg-gradient-to-l from-white/5 to-transparent origin-right -rotate-[35deg] right-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[200vw] h-[30px] bg-gradient-to-l from-[#c9a96e]/10 to-transparent origin-right rotate-[10deg] right-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[100vw] h-[60px] bg-gradient-to-l from-white/5 to-transparent origin-right rotate-[25deg] right-1/2" />

          {/* SVG Crescent */}
          <svg viewBox="0 0 120 120" className="relative z-10 w-full h-full">
            <defs>
              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f5e6c8" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#f5e6c8" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="55" fill="url(#moonGlow)"/>
            <path d="M 75 20 A 40 40 0 1 0 75 100 A 30 30 0 1 1 75 20" fill="#f5e6c8"/>
          </svg>
        </div>

        {/* Hanging Lanterns Container */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {lanternConfigs.map((config, i) => {
            if (isMobile && config.hideOnMobile) return null;
            return (
              <div 
                key={i} 
                className={`absolute top-0 flex flex-col items-center parallax-lanterns night-elements lantern-${i}`} 
                style={{ left: isMobile ? config.mLeft : config.dLeft }}
              >
                <div className={`w-[1px] ${config.stringH} bg-[#c9a96e] opacity-70`} />
                <div className="relative">
                  <svg 
                    viewBox="0 0 40 80" 
                    className="w-[28px] h-[56px] md:w-[40px] md:h-[80px]"
                  >
                    <defs>
                      <radialGradient id={`lanternGlow-${i}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffb347" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.3"/>
                      </radialGradient>
                    </defs>
                    <line x1="20" y1="0" x2="20" y2="12" stroke="#c9a96e" strokeWidth="1"/>
                    <ellipse cx="20" cy="14" rx="10" ry="4" fill="#c9a96e"/>
                    <path d="M 10 14 Q 2 35 8 54 Q 14 65 20 67 Q 26 65 32 54 Q 38 35 30 14 Z" fill={`url(#lanternGlow-${i})`} stroke="#c9a96e" strokeWidth="1"/>
                    <path d="M 10 14 Q 8 40 10 54" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5"/>
                    <path d="M 30 14 Q 32 40 30 54" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5"/>
                    <path d="M 6 35 Q 20 32 34 35" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5"/>
                    <ellipse cx="20" cy="67" rx="8" ry="3" fill="#c9a96e"/>
                    <line x1="20" y1="70" x2="20" y2="80" stroke="#c9a96e" strokeWidth="1.5"/>
                  </svg>
                  <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-[radial-gradient(circle,rgba(255,179,71,0.25)_0%,transparent_70%)] rounded-full blur-md pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quotes Sequence */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          {quotesData.map((quote, i) => (
            <div key={i} className={`absolute w-full max-w-3xl px-6 text-center quote-${i} opacity-0`}>
              <div className="w-[60px] h-[2px] bg-[#c9a96e]/80 mx-auto mb-6 md:mb-8 rounded-full" />
              <h3 className="text-[1.3rem] md:text-[1.8rem] text-[#f5e6c8] font-serif mb-6 md:mb-8 leading-relaxed tracking-wide shadow-black drop-shadow-lg" style={{ fontFamily: "Arial, sans-serif" }} dir="rtl">
                {quote.ar}
              </h3>
              <p className="text-[0.85rem] md:text-[1rem] text-[#c9a96e] italic mb-4 font-light px-2">
                "{quote.id}"
              </p>
              <p className="text-sm text-white/60 tracking-wider">
                {quote.src}
              </p>
              <div className="w-[60px] h-[2px] bg-[#c9a96e]/80 mx-auto mt-6 md:mt-8 rounded-full" />
            </div>
          ))}
        </div>

        {/* Ground Skyline */}
        <div className="absolute bottom-0 left-0 w-full h-[10vh] overflow-hidden night-elements pointer-events-none z-10">
          <div className="w-[200vw] h-full flex items-end opacity-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <svg key={i} viewBox="0 0 400 150" className="w-[400px] h-full flex-shrink-0" fill="#1a1030" preserveAspectRatio="none">
                <ellipse cx="200" cy="60" rx="50" ry="55"/>
                <rect x="150" y="60" width="100" height="80"/>
                <rect x="100" y="30" width="20" height="110"/>
                <polygon points="100,30 110,5 120,30"/>
                <rect x="280" y="30" width="20" height="110"/>
                <polygon points="280,30 290,5 300,30"/>
                <ellipse cx="140" cy="75" rx="25" ry="28"/>
                <ellipse cx="260" cy="75" rx="25" ry="28"/>
                <rect x="0" y="138" width="400" height="12"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Scroll Prompt - FIXED POSITIONING */}
        <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center items-center scroll-prompt z-30 pointer-events-none">
          <p className="text-[#c9a96e] text-[0.8rem] uppercase tracking-[4px] font-semibold text-center drop-shadow-md">
            Scroll untuk melanjutkan ↓
          </p>
        </div>

        {/* Dark Overlay for Transition */}
        <div className="absolute inset-0 bg-[#050505] opacity-0 dark-overlay z-50 pointer-events-none" />
      </div>
    </div>
  );
}
