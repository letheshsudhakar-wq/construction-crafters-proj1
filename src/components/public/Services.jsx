
import React from 'react';
import { Ruler, BrickWall, PaintBucket, Key, Hammer, HardHat, Truck, Wrench } from 'lucide-react';

const ICON_MAP = {
    Ruler: <Ruler />,
    BrickWall: <BrickWall />,
    PaintBucket: <PaintBucket />,
    Key: <Key />,
    Hammer: <Hammer />,
    HardHat: <HardHat />,
    Truck: <Truck />,
    Wrench: <Wrench />
};

const Services = ({ processSteps }) => {
    // Default fallback if no data provided
    const displaySteps = processSteps && processSteps.length > 0 ? processSteps : [
        { icon: "Ruler", title: "Plan & Design", desc: "Detailed architectural planning" },
        { icon: "BrickWall", title: "Structure", desc: "Solid foundation & framework" },
        { icon: "PaintBucket", title: "Finishing", desc: "Premium interiors & exteriors" },
        { icon: "Key", title: "Handover", desc: "Move-in ready delivery" }
    ];

    return (
        <section id="services" className="py-24 bg-primary text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">How We Work</h4>
                    <h2 className="text-4xl font-bold mb-4">From Concept to Creation</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We follow a rigorous process to ensure every project meets our high standards of quality and safety.</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {displaySteps.map((step, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-secondary border-4 border-gray-800 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:border-accent shadow-xl">
                                    {/* Handle both object icon (legacy/fallback) and string icon name (dynamic) */}
                                    {typeof step.icon === 'string'
                                        ? React.cloneElement(ICON_MAP[step.icon] || ICON_MAP['Hammer'] || <Hammer />, { className: "w-8 h-8 text-white" })
                                        : (step.icon && React.isValidElement(step.icon) ? React.cloneElement(step.icon, { className: "w-8 h-8 text-white" }) : null)
                                    }
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-400">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto hover:bg-white/10 transition-colors">
                        <h3 className="text-2xl font-bold mb-4">Ready to start your journey?</h3>
                        <p className="text-gray-300 mb-6">Whether you have a plot or need one, we provide end-to-end construction solutions.</p>
                        <button className="bg-accent hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all">
                            Book a Consultation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
