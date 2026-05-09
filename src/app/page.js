"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollIntro from "@/components/ScrollIntro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profil from "@/components/Profil";
import JadwalSholat from "@/components/JadwalSholat";
import Kegiatan from "@/components/Kegiatan";
import Kontak from "@/components/Kontak";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    // Initial hero animations, wait for the user to scroll past intro
    // Actually, we can trigger hero entrance once it comes into view via ScrollTrigger
    gsap.fromTo(
      "#hero-section",
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top 80%",
        }
      }
    );
    
    gsap.fromTo(
      ".hero-element",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top 70%",
        }
      }
    );

    // Scroll trigger fade up animations for sections
    const sections = gsap.utils.toArray('.section-fade-up');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => {
      // Don't kill all globally, let components handle their own cleanup
      // Or just cleanup the specific ScrollTriggers created here
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger !== null && !t.vars.pin) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <main className="relative bg-background">
      {/* Scroll-triggered cinematic intro section */}
      <ScrollIntro />
      
      {/* Navbar will stick to top once scrolled */}
      <Navbar />
      
      {/* Hero section */}
      <div id="hero-section">
        <Hero />
      </div>

      {/* Main Content */}
      <Profil />
      <JadwalSholat />
      <Kegiatan />
      <Kontak />
      <Footer />
    </main>
  );
}
