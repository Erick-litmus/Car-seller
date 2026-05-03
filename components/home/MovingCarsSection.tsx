"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MovingCar {
    id: number;
    brand: string;
    model: string;
    image: string;
    speed: number;
}

const FEATURED_CARS: MovingCar[] = [
    {
        id: 1,
        brand: "Mercedes-Benz",
        model: "S-Class",
        image: "https://images.unsplash.com/photo-1474386714291-552dd62fcff1?auto=format&fit=crop&q=80&w=800&h=400",
        speed: 3,
    },
    {
        id: 2,
        brand: "BMW",
        model: "7 Series",
        image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&q=80&w=800&h=400",
        speed: 4,
    },
    {
        id: 3,
        brand: "Audi",
        model: "A8",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800&h=400",
        speed: 3.5,
    },
    {
        id: 4,
        brand: "Range Rover",
        model: "Sport",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800&h=400",
        speed: 4.5,
    },
];

export default function MovingCarsSection() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-brand-light to-white">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="text-center">
                    <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">
                        Live Showcase
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
                        Our Moving Gallery
                    </h2>
                    <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">
                        Experience our luxury collection in motion. Each vehicle represents the pinnacle of automotive excellence.
                    </p>
                </div>
            </div>

            <div className="space-y-12">
                {FEATURED_CARS.map((car, index) => (
                    <motion.div
                        key={car.id}
                        className={`flex items-center justify-center ${index % 2 === 0 ? "" : "flex-row-reverse"
                            }`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        {/* Moving Car Image */}
                        <motion.div
                            className="relative w-96 h-48 flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl"
                            animate={{ x: index % 2 === 0 ? [-50, 50] : [50, -50] }}
                            transition={{
                                duration: car.speed,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src={car.image}
                                alt={`${car.brand} ${car.model}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </motion.div>

                        {/* Car Details */}
                        <motion.div
                            className={`flex-1 ${index % 2 === 0 ? "ml-12" : "mr-12"}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                                    {car.brand}
                                </h3>
                                <p className="text-xl text-accent font-bold">{car.model}</p>
                                <p className="text-muted max-w-md">
                                    Experience cutting-edge engineering, premium craftsmanship, and
                                    unparalleled luxury with this exceptional vehicle.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <button className="px-8 py-3 gold-gradient text-white rounded-full font-bold text-sm hover:scale-105 transition-transform">
                                        View Details
                                    </button>
                                    <button className="px-8 py-3 bg-white border-2 border-accent text-accent rounded-full font-bold text-sm hover:bg-accent hover:text-white transition-all">
                                        Inquire Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
