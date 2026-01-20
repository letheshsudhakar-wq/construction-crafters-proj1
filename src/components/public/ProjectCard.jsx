
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, onOpen }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Ongoing': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Planning': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={project.imageUrl || 'https://via.placeholder.com/400x300?text=Project'}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>

                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(project.status)} shadow-sm`}>
                        {project.status}
                    </span>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                    <p className="flex items-center gap-1 text-sm font-medium mb-1">
                        <MapPin className="w-3 h-3 text-accent" /> {project.location}
                    </p>
                    <h3 className="text-xl font-bold">{project.name}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {project.description}
                </p>

                {/* Progress Bar for Ongoing */}
                {project.status === 'Ongoing' && (
                    <div className="mb-4">
                        <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-secondary">Progress</span>
                            <span className="text-accent">{project.completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-accent h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${project.completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.features && project.features.slice(0, 3).map((feat, i) => (
                        <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                            {feat}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => onOpen(project)}
                    className="w-full py-3 border border-gray-200 rounded-lg text-secondary font-semibold hover:bg-primary hover:text-white hover:border-primary transition flex items-center justify-center gap-2 group-hover:gap-3"
                >
                    View Details <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
