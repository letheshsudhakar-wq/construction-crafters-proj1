
import React, { useState } from 'react';
import { Plus, Edit, Trash, X, Save, Check } from 'lucide-react';
import { db, STORAGE_KEYS } from '../../utils/storageUtils';

const ProjectManager = ({ projects, onUpdate }) => {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isNew, setIsNew] = useState(false);

    // Initialize form for new project
    const handleAddNew = () => {
        setFormData({
            id: `proj_${Date.now()}`,
            name: '',
            location: '',
            type: 'Home Construction',
            status: 'Planning',
            completionPercentage: 0,
            description: '',
            imageUrl: '',
            features: [],
            isActive: true
        });
        setEditingId('new');
        setIsNew(true);
    };

    // Initialize form for editing
    const handleEdit = (project) => {
        setFormData({ ...project });
        setEditingId(project.id);
        setIsNew(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter(p => p.id !== id);
            db.set(STORAGE_KEYS.PROJECTS, updatedProjects);
            onUpdate();
        }
    };

    const handleSave = () => {
        let updatedProjects;
        if (isNew) {
            updatedProjects = [formData, ...projects];
        } else {
            updatedProjects = projects.map(p => p.id === formData.id ? formData : p);
        }

        db.set(STORAGE_KEYS.PROJECTS, updatedProjects);
        onUpdate();
        setEditingId(null);
        setIsNew(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Projects Directory</h2>
                <button
                    onClick={handleAddNew}
                    disabled={editingId !== null}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary flex items-center gap-2 disabled:opacity-50"
                >
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </div>

            {editingId && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg animate-fade-in-up">
                    <h3 className="font-bold mb-4">{isNew ? 'New Project' : 'Edit Project'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Project Name" className="border p-2 rounded w-full" />
                        <input name="location" value={formData.location || ''} onChange={handleChange} placeholder="Location" className="border p-2 rounded w-full" />

                        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded w-full">
                            <option>Residential Plots</option>
                            <option>Home Construction</option>
                            <option>Commercial</option>
                        </select>

                        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded w-full">
                            <option>Planning</option>
                            <option>Ongoing</option>
                            <option>Completed</option>
                        </select>

                        <div className="col-span-full">
                            <label className="text-xs text-gray-500">Progress: {formData.completionPercentage}%</label>
                            <input
                                type="range"
                                name="completionPercentage"
                                min="0" max="100"
                                value={formData.completionPercentage || 0}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </div>

                        <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full col-span-full h-24" />
                        <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} placeholder="Image URL (https://...)" className="border p-2 rounded w-full col-span-full" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"><Save className="w-4 h-4" /> Save Project</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {projects.map(project => (
                    <div key={project.id} className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full">
                            <img src={project.imageUrl || 'https://via.placeholder.com/50'} alt="" className="w-12 h-12 rounded object-cover bg-gray-100" />
                            <div>
                                <h4 className="font-bold text-gray-800">{project.name}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${project.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {project.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => handleEdit(project)} className="p-2 hover:bg-blue-100 hover:text-blue-600 border-r border-gray-200"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-100 hover:text-red-600"><Trash className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && <p className="text-gray-500 text-center py-8">No projects found. Add one to get started.</p>}
            </div>
        </div>
    );
};

export default ProjectManager;
