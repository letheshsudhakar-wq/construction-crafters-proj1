
import React from 'react';
import { Award, Clock, HardHat, Users } from 'lucide-react';

const About = ({ data }) => {
    if (!data) return null;

    const stats = [
        { icon: <Clock className="w-6 h-6" />, value: data.experience, label: "Experience" },
        { icon: <HardHat className="w-6 h-6" />, value: "50+", label: "Projects Done" },
        { icon: <Users className="w-6 h-6" />, value: "100+", label: "Expert Team" },
        { icon: <Award className="w-6 h-6" />, value: "15+", label: "Awards Won" },
    ];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Side */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000"
                                alt="Construction Team"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decor */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl -z-0"></div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Who We Are</h4>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Master Builders for Modern Living</h2>
                            <p className="text-secondary text-lg leading-relaxed mb-6">
                                {data.introduction}
                            </p>
                            <div className="bg-background p-6 rounded-xl border-l-4 border-accent">
                                <p className="text-secondary font-medium italic">
                                    "{data.mission}"
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center p-4 rounded-lg hover:bg-gray-50 transition duration-300">
                                    <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4">Core Values</h3>
                            <div className="flex flex-wrap gap-3">
                                {data.coreValues && data.coreValues.map((val, i) => (
                                    <span key={i} className="px-4 py-2 bg-gray-100 rounded-lg text-secondary font-medium text-sm flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        {val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
