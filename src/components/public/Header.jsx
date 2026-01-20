
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';

const Header = ({ navigate, onOpenQuote, onAdminClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', section: 'hero' },
        { label: 'About', section: 'about' },
        { label: 'Projects', section: 'projects' },
        { label: 'Plots', section: 'plots' },
        { label: 'Services', section: 'services' },
        { label: 'Pricing', section: 'pricing' },
        { label: 'Contact', section: 'contact' },
    ];

    const handleNavClick = (section) => {
        navigate(section);
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick('hero')}
                >
                    <div className="bg-accent p-2 rounded-lg">
                        <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
                        Construction<span className="text-accent">Crafters</span>
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleNavClick(link.section)}
                            className={`font-medium text-sm tracking-wide transition-colors ${isScrolled ? 'text-secondary hover:text-accent' : 'text-gray-200 hover:text-white'
                                }`}
                        >
                            {link.label.toUpperCase()}
                        </button>
                    ))}
                    <button
                        onClick={onOpenQuote}
                        className="bg-accent hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-transform hover:scale-105 shadow-lg"
                    >
                        Get Quote
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={onOpenQuote}
                        className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold"
                    >
                        Quote
                    </button>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ?
                            <X className={isScrolled ? 'text-primary' : 'text-white'} /> :
                            <Menu className={isScrolled ? 'text-primary' : 'text-white'} />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 py-4 flex flex-col lg:hidden">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleNavClick(link.section)}
                            className="py-3 px-8 text-left text-secondary hover:bg-gray-50 hover:text-accent font-medium"
                        >
                            {link.label}
                        </button>
                    ))}
                    <div className="px-8 mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <button onClick={onAdminClick} className="text-xs text-gray-400 uppercase tracking-widest">
                            Host Admin
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
