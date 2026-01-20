
import React, { useState } from 'react';
import { Plus, Edit, Trash, Save, Ruler, BrickWall, PaintBucket, Key, Hammer, HardHat, Truck, Wrench } from 'lucide-react';
import { db, STORAGE_KEYS } from '../../utils/storageUtils';

const ICON_MAP = {
    Ruler: <Ruler />,
    BrickWall: <BrickWall />,
    PaintBucket: <PaintBucket />,
    Key: <Key />,
    Hammer: <Hammer />,
    HardHat: <HardHat />,
    Truck: <Truck />,
    Wrench: <Wrench />
};

const ServiceManager = ({ processSteps, onUpdate }) => {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isNew, setIsNew] = useState(false);

    const handleAddNew = () => {
        setFormData({
            id: `step_${Date.now()}`,
            title: '',
            desc: '',
            icon: 'Hammer'
        });
        setEditingId('new');
        setIsNew(true);
    };

    const handleEdit = (step) => {
        setFormData({ ...step });
        setEditingId(step.id);
        setIsNew(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this step?')) {
            const updated = processSteps.filter(s => s.id !== id);
            db.set(STORAGE_KEYS.WORK_PROCESS, updated);
            onUpdate();
        }
    };

    const handleSave = () => {
        let updated;
        if (isNew) {
            updated = [...processSteps, formData];
        } else {
            updated = processSteps.map(s => s.id === formData.id ? formData : s);
        }
        db.set(STORAGE_KEYS.WORK_PROCESS, updated);
        onUpdate();
        setEditingId(null);
        setIsNew(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Process / Services Steps</h2>
                <button onClick={handleAddNew} disabled={editingId !== null} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary flex gap-2 disabled:opacity-50 text-sm items-center">
                    <Plus className="w-4 h-4" /> Add Step
                </button>
            </div>

            {editingId && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg animate-fade-in-up">
                    <h3 className="font-bold mb-4">{isNew ? 'New Process Step' : 'Edit Step'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Step Title (e.g. Planning)" className="border p-2 rounded w-full" />

                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Select Icon</label>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(ICON_MAP).map(iconName => (
                                    <button
                                        key={iconName}
                                        onClick={() => setFormData({ ...formData, icon: iconName })}
                                        className={`p-2 rounded border ${formData.icon === iconName ? 'bg-accent text-white border-accent' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                                        title={iconName}
                                    >
                                        {React.cloneElement(ICON_MAP[iconName], { className: "w-4 h-4" })}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full md:col-span-2 h-20" />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {processSteps && processSteps.map((step, index) => (
                    <div key={step.id || index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group text-center">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button onClick={() => handleEdit(step)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(step.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash className="w-4 h-4" /></button>
                        </div>
                        <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3 text-secondary">
                            {ICON_MAP[step.icon] || <Hammer />}
                        </div>
                        <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                ))}
            </div>
            {(!processSteps || processSteps.length === 0) && <p className="text-center text-gray-400 py-8">No process steps defined.</p>}
        </div>
    );
};

export default ServiceManager;
