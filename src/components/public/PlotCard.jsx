
import React from 'react';
import { Maximize, MapPin, CheckCircle } from 'lucide-react';

const PlotCard = ({ plot }) => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Available': return 'bg-success/10 text-success border-success/20';
            case 'Reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Sold': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const isSold = plot.status === 'Sold';

    return (
        <div className={`relative bg-white border border-gray-100 rounded-xl p-6 transition-all hover:shadow-lg ${isSold ? 'opacity-75 grayscale-[0.5]' : ''}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusBadge(plot.status)} mb-2`}>
                        {plot.status}
                    </span>
                    <h3 className="text-xl font-bold text-primary">Plot {plot.plotNumber}</h3>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                    <Maximize className="w-5 h-5 text-secondary" />
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-accent" />
                    {plot.location}
                </div>
                <div className="flex justify-between items-center text-sm pb-3 border-b border-dashed border-gray-200">
                    <span className="text-gray-500">Size</span>
                    <span className="font-semibold text-primary">{plot.size} <span className="text-xs text-gray-400">{plot.sizeUnit}</span></span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500">Price</span>
                    <span className="text-lg font-bold text-primary">₹{(plot.price / 100000).toFixed(2)} Lakhs</span>
                </div>
            </div>

            <div className="space-y-2 mb-6">
                {plot.amenities && plot.amenities.slice(0, 2).map((amenity, i) => (
                    <div key={i} className="flex items-center text-xs text-gray-500">
                        <CheckCircle className="w-3 h-3 mr-2 text-success" /> {amenity}
                    </div>
                ))}
            </div>

            <button
                disabled={isSold}
                className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${isSold
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-secondary'
                    }`}
            >
                {isSold ? 'Unavailable' : 'Enquire Now'}
            </button>
        </div>
    );
};

export default PlotCard;
