
import React, { useState } from 'react';
import PlotCard from './PlotCard';
import { Search } from 'lucide-react';

const PlotGrid = ({ plots }) => {
    const [showSold, setShowSold] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPlots = plots.filter(p => {
        if (!p.isActive) return false;
        // By default hide sold unless toggled - prompt said "Only show Available and Reserved plots to public (hide Sold)"
        // but typically "hide Sold" means don't show by default or don't show at all. 
        // The prompt explicitly says "Only show Available and Reserved plots to public (hide Sold)". 
        // I will interpret this as "Sold plots should not be visible to public".
        // However, for a comprehensive portfolio, sometimes sold plots are shown. 
        // I'll strictly follow "hide Sold" but maybe keep the code flexible if I misinterpreted "hide".
        // Re-reading: "Only show Available and Reserved plots to public (hide Sold)" - seems strict.
        if (p.status === 'Sold') return false;

        if (searchTerm && !p.location.toLowerCase().includes(searchTerm.toLowerCase()) && !p.plotNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        return true;
    });

    return (
        <section id="plots" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Real Estate</h4>
                        <h2 className="text-4xl font-bold text-primary mb-4">Prime Plots for Sale</h2>
                        <p className="text-gray-500">Find the perfect spot for your dream home or next investment.</p>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search location or plot..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredPlots.length > 0 ? (
                        filteredPlots.map((plot) => (
                            <PlotCard key={plot.id} plot={plot} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <p className="text-gray-500">No plots match your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PlotGrid;
