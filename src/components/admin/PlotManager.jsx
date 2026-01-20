
import React, { useState } from 'react';
import { Plus, Edit, Trash, Save, DollarSign } from 'lucide-react';
import { db, STORAGE_KEYS } from '../../utils/storageUtils';

const PlotManager = ({ plots, onUpdate }) => {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isNew, setIsNew] = useState(false);
    const [filter, setFilter] = useState('All');

    const handleAddNew = () => {
        setFormData({
            id: `plot_${Date.now()}`,
            plotNumber: '',
            location: '',
            size: '',
            sizeUnit: 'sq ft',
            price: 0,
            status: 'Available',
            amenities: [],
            plotType: 'Residential',
            isActive: true
        });
        setEditingId('new');
        setIsNew(true);
    };

    const handleEdit = (plot) => {
        setFormData({ ...plot });
        setEditingId(plot.id);
        setIsNew(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this plot?')) {
            const updated = plots.filter(p => p.id !== id);
            db.set(STORAGE_KEYS.PLOTS, updated);
            onUpdate();
        }
    };

    const handleSave = () => {
        let updated;
        if (isNew) {
            updated = [formData, ...plots];
        } else {
            updated = plots.map(p => p.id === formData.id ? formData : p);
        }
        db.set(STORAGE_KEYS.PLOTS, updated);
        onUpdate();
        setEditingId(null);
        setIsNew(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const filteredPlots = plots.filter(p => filter === 'All' ? true : p.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Plot Manager</h2>
                <div className="flex gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                        <option>All</option>
                        <option>Available</option>
                        <option>Reserved</option>
                        <option>Sold</option>
                    </select>
                    <button onClick={handleAddNew} disabled={editingId !== null} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary flex gap-2 disabled:opacity-50 text-sm items-center">
                        <Plus className="w-4 h-4" /> Add Plot
                    </button>
                </div>
            </div>

            {editingId && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                    <h3 className="font-bold mb-4">{isNew ? 'New Plot' : 'Edit Plot'}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <input name="plotNumber" value={formData.plotNumber} onChange={handleChange} placeholder="Plot No." className="border p-2 rounded" />
                        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
                        <input name="size" value={formData.size} onChange={handleChange} placeholder="Size" className="border p-2 rounded" />
                        <select name="sizeUnit" value={formData.sizeUnit} onChange={handleChange} className="border p-2 rounded">
                            <option>sq ft</option>
                            <option>sq yards</option>
                            <option>acres</option>
                        </select>
                        <div className="relative col-span-2">
                            <DollarSign className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 pl-8 rounded w-full" />
                        </div>
                        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded col-span-2">
                            <option>Available</option>
                            <option>Reserved</option>
                            <option>Sold</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border rounded">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
                    </div>
                </div>
            )}

            {/* Table-like List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-6 bg-gray-50 p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                    <div className="col-span-1">Plot No</div>
                    <div className="col-span-1">Location</div>
                    <div className="col-span-1">Size</div>
                    <div className="col-span-1">Price</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>
                <div className="divide-y divide-gray-100">
                    {filteredPlots.map(plot => (
                        <div key={plot.id} className="grid grid-cols-6 p-4 items-center hover:bg-gray-50 text-sm">
                            <div className="font-bold">{plot.plotNumber}</div>
                            <div className="text-gray-600">{plot.location}</div>
                            <div>{plot.size} <span className="text-xs text-gray-400">{plot.sizeUnit}</span></div>
                            <div className="font-mono">₹{(plot.price / 100000).toFixed(2)}L</div>
                            <div>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${plot.status === 'Available' ? 'bg-green-100 text-green-700' :
                                        plot.status === 'Sold' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {plot.status}
                                </span>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => handleEdit(plot)} className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(plot.id)} className="text-red-400 hover:text-red-600"><Trash className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                    {filteredPlots.length === 0 && <div className="p-8 text-center text-gray-400">No plots found.</div>}
                </div>
            </div>
        </div>
    );
};

export default PlotManager;
