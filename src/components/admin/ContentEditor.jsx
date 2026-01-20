
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { db, STORAGE_KEYS } from '../../utils/storageUtils';

const ContentEditor = ({ data, onUpdate }) => {
    const [formData, setFormData] = useState({
        introduction: '',
        mission: '',
        experience: '',
        coreValues: [],
        teamHighlights: '' // In sample data this is a string, let's keep it simple
    });

    useEffect(() => {
        if (data) {
            setFormData({
                ...data,
                // Ensure array loaded safely
                coreValues: Array.isArray(data.coreValues) ? data.coreValues : []
            });
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (idx, val) => {
        const newValues = [...formData.coreValues];
        newValues[idx] = val;
        setFormData({ ...formData, coreValues: newValues });
    };

    const addValue = () => {
        setFormData({ ...formData, coreValues: [...formData.coreValues, ''] });
    };

    const removeValue = (idx) => {
        const newValues = formData.coreValues.filter((_, i) => i !== idx);
        setFormData({ ...formData, coreValues: newValues });
    };

    const handleSave = () => {
        const cleanData = {
            ...formData,
            coreValues: formData.coreValues.filter(v => v.trim() !== '') // Remove empty strings
        };
        db.set(STORAGE_KEYS.ABOUT, cleanData);
        onUpdate();
        alert('Content Updated Successfully');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Edit 'About Us' Content</h2>
                <button onClick={handleSave} className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 font-bold shadow-lg">
                    <Save className="w-5 h-5" /> Save Changes
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Introduction</label>
                    <textarea
                        name="introduction"
                        value={formData.introduction}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    ></textarea>
                    <p className="text-xs text-gray-400 mt-1">Displayed in the main About section.</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mission Statement</label>
                    <textarea
                        name="mission"
                        value={formData.mission}
                        onChange={handleChange}
                        rows="2"
                        className="w-full border border-gray-300 rounded-lg p-3"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience</label>
                        <input
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Team Highlights (Text)</label>
                        <input
                            name="teamHighlights"
                            value={formData.teamHighlights}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Core Values</label>
                    <div className="space-y-3">
                        {formData.coreValues.map((val, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={val}
                                    onChange={(e) => handleArrayChange(i, e.target.value)}
                                    className="flex-1 border border-gray-300 rounded p-2"
                                    placeholder="Value (e.g. Integrity)"
                                />
                                <button onClick={() => removeValue(i)} className="text-red-500 hover:text-red-700 px-2 font-bold">×</button>
                            </div>
                        ))}
                        <button onClick={addValue} className="text-sm text-primary hover:underline font-medium">+ Add Core Value</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;
