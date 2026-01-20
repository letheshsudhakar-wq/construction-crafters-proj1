
import React, { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    Building2,
    Map,
    MapPin,
    LogOut,
    Settings
} from 'lucide-react';

const AdminLayout = ({ onLogout, children, currentSection, onNavigate }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
        { id: 'projects', label: 'Projects', icon: <Building2 /> },
        { id: 'plots', label: 'Plots', icon: <Map /> },
        { id: 'locations', label: 'Locations', icon: <MapPin /> },
        { id: 'services', label: 'Services', icon: <FileText /> },
        { id: 'pricing', label: 'Pricing', icon: <FileText /> },
        { id: 'content', label: 'About Content', icon: <FileText /> },
        { id: 'settings', label: 'Settings', icon: <Settings /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold tracking-tight">Admin Console</h2>
                    <p className="text-xs text-gray-400 mt-1">Construction Crafters</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentSection === item.id
                                ? 'bg-accent text-white shadow-md'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="w-5 h-5">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-white/5 hover:text-red-200 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main ContentArea */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white px-8 py-5 border-b border-gray-200 sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-gray-800 capitalise">
                        {menuItems.find(m => m.id === currentSection)?.label} Manager
                    </h1>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
