
import React, { useState } from 'react';
import { Plus, Edit, Trash, MapPin } from 'lucide-react';
import { db, STORAGE_KEYS } from '../../utils/storageUtils';

const LocationManager = ({ locations, onUpdate }) => {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isNew, setIsNew] = useState(false);

    const handleAddNew = () => {
        setFormData({
            id: `loc_${Date.now()}`,
            name: '',
            address: '',
            city: '',
            phone: '',
            email: '',
            operatingHours: '',
            isPrimary: false,
            isActive: true
        });
        setEditingId('new');
        setIsNew(true);
    };

    const handleEdit = (loc) => {
        setFormData({ ...loc });
        setEditingId(loc.id);
        setIsNew(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this location?')) {
            const updated = locations.filter(l => l.id !== id);
            db.set(STORAGE_KEYS.LOCATIONS, updated);
            onUpdate();
        }
    };

    const handleSave = () => {
        let updated;
        if (isNew) {
            updated = [formData, ...locations];
        } else {
            updated = locations.map(l => l.id === formData.id ? formData : l);
        }
        // If set to primary, unset others (optional but good UX)
        if (formData.isPrimary) {
            updated = updated.map(l => l.id === formData.id ? l : { ...l, isPrimary: false });
        }

        db.set(STORAGE_KEYS.LOCATIONS, updated);
        onUpdate();
        setEditingId(null);
        setIsNew(false);
    };

    const handleChange = (e) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: val });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Business Locations</h2>
                <button onClick={handleAddNew} disabled={editingId !== null} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary flex gap-2 disabled:opacity-50">
                    <Plus className="w-4 h-4" /> Add Location
                </button>
            </div>

            {editingId && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                    <h3 className="font-bold mb-4">{isNew ? 'New Location' : 'Edit Location'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Branch Name (e.g. Sales Office)" className="border p-2 rounded w-full" />
                        <input name="city" value={formData.city} onChange={handleChange} placeholder="City / Area" className="border p-2 rounded w-full" />
                        <input name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" className="border p-2 rounded w-full col-span-full" />
                        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Contact Phone" className="border p-2 rounded w-full" />
                        <input name="email" value={formData.email} onChange={handleChange} placeholder="Contact Email" className="border p-2 rounded w-full" />
                        <div className="flex items-center gap-4 mt-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="isPrimary" checked={formData.isPrimary} onChange={handleChange} />
                                <span className="text-sm">Main Headquarters</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                                <span className="text-sm">Active (Published)</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save Location</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.map(loc => (
                    <div key={loc.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                        {loc.isPrimary && <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl">HQ</div>}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-full"><MapPin className="w-5 h-5 text-gray-600" /></div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{loc.name}</h3>
                                    <p className="text-sm text-gray-500">{loc.city}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(loc)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(loc.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>{loc.address}</p>
                            <p>{loc.phone}</p>
                            <p>{loc.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationManager;
