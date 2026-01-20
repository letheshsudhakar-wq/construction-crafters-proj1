
import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = ({ onNavigate }) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="hero"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background with Parallax */}
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/construction crafters web video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-10 text-center text-white relative">
                <div className="animate-fade-in-up space-y-6 max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wider uppercase mb-4">
                        Premium Construction Services
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Building Visions into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">
                            Concrete Reality
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        From luxury residential homes to commercial landmarks, Construction Crafters delivers excellence in every square foot.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => onNavigate('projects')}
                            className="group bg-accent hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2"
                        >
                            View Our Projects
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => onNavigate('contact')}
                            className="group bg-white/10 hover:bg-white/20 hover:backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown className="text-white w-8 h-8 opacity-70" />
            </div>
        </section>
    );
};

export default Hero;
