
import React from 'react';
import { Check } from 'lucide-react';

const Pricing = ({ pricing }) => {
    return (
        <section id="pricing" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Transparent Pricing</h4>
                    <h2 className="text-4xl font-bold text-primary mb-4">Construction Packages</h2>
                    <p className="text-gray-500">Choose a package that fits your needs and budget.</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
                    {pricing && pricing.map((tier, index) => (
                        <div
                            key={index}
                            className={`flex-1 bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2 relative ${index === 1 ? 'border-2 border-accent transform scale-105 z-10 shadow-xl' : 'border border-gray-100'
                                }`}
                        >
                            {index === 1 && (
                                <div className="bg-accent text-white text-center text-xs font-bold uppercase py-1 tracking-wider">
                                    Recommended
                                </div>
                            )}

                            <div className="p-8 text-center border-b border-gray-100">
                                <h3 className="text-xl font-bold text-primary mb-2">{tier.title}</h3>
                                <div className="text-4xl font-bold text-primary mb-1">
                                    ₹{tier.price}
                                    <span className="text-sm font-normal text-gray-400">/ sq.ft</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Base price + taxes</p>
                            </div>

                            <div className="p-8 space-y-4">
                                {tier.features.map((feat, i) => (
                                    <div key={i} className="flex items-start">
                                        <Check className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 pt-0">
                                <button
                                    className={`w-full py-3 rounded-lg font-bold transition-colors ${index === 1
                                            ? 'bg-primary text-white hover:bg-secondary'
                                            : 'bg-gray-100 text-primary hover:bg-gray-200'
                                        }`}
                                >
                                    Choose {tier.title}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 text-sm text-gray-400 italic">
                    * Prices are subject to change based on location and specific requirements.
                </div>
            </div>
        </section>
    );
};

export default Pricing;
