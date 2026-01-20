
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = ({ locations }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'Home Construction',
        location: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', type: 'General', location: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }, 1000);
    };

    const activeLocations = locations ? locations.filter(l => l.isActive) : [];

    return (
        <section id="contact" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Contact Info Side */}
                    <div className="lg:w-1/3 space-y-8">
                        <div>
                            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</h4>
                            <h2 className="text-4xl font-bold text-primary mb-4">Let's Build Something Great</h2>
                            <p className="text-gray-500">Visit one of our offices or send us a message to get started.</p>
                        </div>

                        <div className="space-y-6">
                            {activeLocations.map((loc) => (
                                <div key={loc.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-accent" />
                                        {loc.name} {loc.isPrimary && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">HQ</span>}
                                    </h3>
                                    <p className="text-gray-600 mb-4 pl-7 text-sm leading-relaxed">
                                        {loc.address}<br />{loc.city}
                                    </p>
                                    <div className="pl-7 space-y-2 text-sm">
                                        <div className="flex items-center text-gray-600">
                                            <Phone className="w-4 h-4 mr-2 text-secondary" /> {loc.phone}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="w-4 h-4 mr-2 text-secondary" /> {loc.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
                            <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>

                            {submitted ? (
                                <div className="bg-green-50 text-green-800 p-6 rounded-xl flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full"><Send className="w-5 h-5" /></div>
                                    <div>
                                        <p className="font-bold">Message Sent!</p>
                                        <p className="text-sm">Thank you for contacting us. We will get back to you shortly.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Inquiry Type</label>
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition bg-white"
                                            >
                                                <option>Home Construction</option>
                                                <option>Plot Purchase</option>
                                                <option>Commercial Project</option>
                                                <option>General Inquiry</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Message</label>
                                        <textarea
                                            required
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                                            placeholder="Tell us about your requirements..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        Send Inquiry <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
