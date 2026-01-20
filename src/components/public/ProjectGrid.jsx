
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects }) => {
    const [filter, setFilter] = useState('All');

    const filteredProjects = projects.filter(p => {
        if (!p.isActive) return false;
        if (filter === 'All') return true;
        return p.status === filter;
    });

    const filters = ['All', 'Ongoing', 'Completed', 'Planning'];

    return (
        <section id="projects" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Our Portfolio</h4>
                    <h2 className="text-4xl font-bold text-primary mb-4">Crafting Excellence Across Locations</h2>
                    <p className="text-gray-500">Explore our signature projects that blend innovation with functionality.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white p-1 rounded-full shadow-sm">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === f
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-500 hover:text-primary hover:bg-gray-100'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpen={(p) => console.log('Open project', p.name)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            No projects found in this category.
                        </div>
                    )}
                </div>

                {/* View All Btn */}
                <div className="text-center mt-16">
                    <button className="text-primary font-bold hover:text-accent transition underline underline-offset-4">
                        View Project Archive
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProjectGrid;
