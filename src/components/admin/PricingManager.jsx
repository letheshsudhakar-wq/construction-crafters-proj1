
import React, { useState } from 'react';
import { Plus, Edit, Trash, Save, Check } from 'lucide-react';
import { db, STORAGE_KEYS } from '../../utils/storageUtils';

const PricingManager = ({ pricing, onUpdate }) => {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isNew, setIsNew] = useState(false);

    const handleAddNew = () => {
        setFormData({
            id: `plan_${Date.now()}`,
            title: '',
            price: '',
            features: ['']
        });
        setEditingId('new');
        setIsNew(true);
    };

    const handleEdit = (plan, index) => {
        // We use index as ID fallback if ID is missing from old data
        setFormData({ ...plan, id: plan.id || `plan_${index}` });
        setEditingId(plan.id || `plan_${index}`);
        setIsNew(false);
    };

    const handleDelete = (idx) => {
        if (window.confirm('Delete this plan?')) {
            const updated = pricing.filter((_, i) => i !== idx);
            db.set(STORAGE_KEYS.PRICING, updated);
            onUpdate();
        }
    };

    const handleSave = () => {
        // Clean empty features
        const cleanData = {
            ...formData,
            features: formData.features.filter(f => f.trim() !== '')
        };

        let updated;
        if (isNew) {
            updated = [...pricing, cleanData];
        } else {
            // Find by ID or index. Since we might generate ID on the fly for edit, 
            // the safest way for array-based storage without solid IDs is to map carefully.
            // But here we can assume the editingId matches what we set.
            updated = pricing.map((p, i) => {
                const pId = p.id || `plan_${i}`;
                return pId === editingId ? cleanData : p;
            });
        }
        db.set(STORAGE_KEYS.PRICING, updated);
        onUpdate();
        setEditingId(null);
        setIsNew(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeatureChange = (idx, val) => {
        const newFeats = [...formData.features];
        newFeats[idx] = val;
        setFormData({ ...formData, features: newFeats });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (idx) => {
        setFormData({ ...formData, features: formData.features.filter((_, i) => i !== idx) });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Pricing Packages</h2>
                <button onClick={handleAddNew} disabled={editingId !== null} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary flex gap-2 disabled:opacity-50 text-sm items-center">
                    <Plus className="w-4 h-4" /> Add Package
                </button>
            </div>

            {editingId && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg animate-fade-in-up">
                    <h3 className="font-bold mb-4">{isNew ? 'New Package' : 'Edit Package'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Plan Name (e.g. Premium)" className="border p-2 rounded w-full" />
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-500">₹</span>
                            <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded w-full" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 mb-2">Features List</label>
                        <div className="space-y-2">
                            {formData.features.map((feat, i) => (
                                <div key={i} className="flex gap-2">
                                    <input value={feat} onChange={(e) => handleFeatureChange(i, e.target.value)} className="flex-1 border p-2 rounded" placeholder="Feature description" />
                                    <button onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700">×</button>
                                </div>
                            ))}
                            <button onClick={addFeature} className="text-sm text-primary hover:underline font-bold">+ Add Feature</button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"><Save className="w-4 h-4" /> Save Package</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricing && pricing.map((plan, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button onClick={() => handleEdit(plan, index)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(index)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash className="w-4 h-4" /></button>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">{plan.title}</h3>
                        <div className="text-3xl font-bold text-gray-800 mb-4">₹{plan.price}</div>
                        <ul className="space-y-2">
                            {plan.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {(!pricing || pricing.length === 0) && <p className="text-center text-gray-400 py-8">No pricing packages found.</p>}
        </div>
    );
};

export default PricingManager;
