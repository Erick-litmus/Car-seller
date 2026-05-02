"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Share2, Heart, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VehicleGallery({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Close full-screen on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullScreen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    if (isFullScreen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-brand-dark shadow-2xl group cursor-pointer" onClick={() => setIsFullScreen(true)}>
          <Image
            src={images[activeImage] || "/hero-car.png"}
            alt="Vehicle"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          
          <div className="absolute top-6 right-6 flex gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFullScreen(true); }}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent transition-colors shadow-lg"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === i ? "border-accent scale-95 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="Thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button 
              onClick={() => setIsFullScreen(false)}
              className="absolute top-6 right-6 p-4 text-white/60 hover:text-white transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="relative w-full max-w-6xl aspect-video px-12">
              <Image
                src={images[activeImage] || "/hero-car.png"}
                alt="Vehicle Fullscreen"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-medium tracking-widest text-sm">
              {activeImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
