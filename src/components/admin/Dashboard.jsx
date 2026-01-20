
import React from 'react';
import { Building2, Map, MapPin } from 'lucide-react';

const Dashboard = ({ data }) => {
    const { projects, plots, locations } = data;

    const stats = [
        {
            title: 'Total Projects',
            value: projects.length,
            icon: <Building2 className="w-8 h-8 text-blue-500" />,
            color: 'bg-blue-50'
        },
        {
            title: 'Active Projects',
            value: projects.filter(p => p.status === 'Ongoing').length,
            desc: 'Currently in progress',
            icon: <Building2 className="w-8 h-8 text-orange-500" />,
            color: 'bg-orange-50'
        },
        {
            title: 'Available Plots',
            value: plots.filter(p => p.status === 'Available').length,
            icon: <Map className="w-8 h-8 text-green-500" />,
            color: 'bg-green-50'
        },
        {
            title: 'Business Locations',
            value: locations.filter(l => l.isActive).length,
            icon: <MapPin className="w-8 h-8 text-purple-500" />,
            color: 'bg-purple-50'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                        <p className="text-gray-500 font-medium">{stat.title}</p>
                        {stat.desc && <p className="text-xs text-gray-400 mt-2">{stat.desc}</p>}
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <p className="text-gray-500">Select a section from the sidebar to manage content.</p>
                {/* Could add shortcuts here later */}
            </div>
        </div>
    );
};

export default Dashboard;
