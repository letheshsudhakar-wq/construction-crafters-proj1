
import React from 'react';
import { ShieldCheck, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = ({ onAdminLogin }) => {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-accent w-6 h-6" />
                            <span className="text-2xl font-bold tracking-tight">
                                Construction<span className="text-accent">Crafters</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Building quality homes and commercial spaces with a legacy of trust and excellence.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><Instagram className="w-4 h-4" /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><Twitter className="w-4 h-4" /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><Linkedin className="w-4 h-4" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#hero" className="hover:text-accent transition">Home</a></li>
                            <li><a href="#about" className="hover:text-accent transition">About Us</a></li>
                            <li><a href="#projects" className="hover:text-accent transition">Projects</a></li>
                            <li><a href="#plots" className="hover:text-accent transition">Available Plots</a></li>
                            <li><a href="#services" className="hover:text-accent transition">Services</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>Residential Construction</li>
                            <li>Commercial Projects</li>
                            <li>Land Development</li>
                            <li>Interior Design</li>
                            <li>Consultation</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for latest updates.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full text-sm outline-none focus:border-accent" />
                            <button className="bg-accent px-4 py-2 rounded-r-lg hover:bg-orange-600 transition">Go</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; 2026 Construction Crafters. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <button onClick={onAdminLogin} className="hover:text-white uppercase tracking-wider font-semibold">
                            Admin Login
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
