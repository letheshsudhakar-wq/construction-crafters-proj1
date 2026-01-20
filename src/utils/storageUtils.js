
// Core Storage Utilities using window.storage
// CRITICAL: All content must persist across sessions using window.storage only.

const STORAGE_KEYS = {
    ABOUT: 'cc_about_data',
    PROJECTS: 'cc_projects',
    PLOTS: 'cc_plots',
    LOCATIONS: 'cc_locations',
    FEATURES: 'cc_features',
    PRICING: 'cc_pricing',
    CONTACT: 'cc_contact_info',
    SOCIAL: 'cc_social_media',
    WORK_PROCESS: 'cc_work_process',
    ADMIN_PASS: 'cc_admin_password'
};

// Helper accessors for window.storage or fallback
const getStorage = () => {
    if (typeof window !== 'undefined' && window.storage) {
        return window.storage;
    }
    // Fallback for development environments where window.storage might not exist specifically
    // We use a mock in memory or warn. The prompt explicitly mandated window.storage.
    // We'll attach a simple mock if it's missing to prevent crashes.
    if (typeof window !== 'undefined' && !window.storage) {
        console.warn('window.storage API not found. Using volatile memory fallback.');
        window.storage = {};
    }
    return window.storage || {};
};

// Generic Get/Set
export const db = {
    get: (key) => {
        try {
            const storage = getStorage();
            const data = storage[key];
            // window.storage in some custom envs might return objects directly or JSON strings.
            // We will assume it acts like a persistent object store. 
            // If it returns a string, we parse it.
            if (typeof data === 'string') {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    return data;
                }
            }
            return data;
        } catch (err) {
            console.error(`Error reading ${key}:`, err);
            return null;
        }
    },
    set: (key, value) => {
        try {
            const storage = getStorage();
            // Ensure we store stringified data if the underlying storage requires it, 
            // but for "window.storage" custom APIs it's often an object. 
            // We'll store consistent JSON structure.
            storage[key] = JSON.stringify(value);
            return true;
        } catch (err) {
            console.error(`Error writing ${key}:`, err);
            return false;
        }
    }
};

// Sample Data Generators
const generateSampleData = () => {
    console.log('Initializing Sample Data...');

    const sampleProjects = [
        {
            id: 'proj_1',
            name: 'Sunrise Heights',
            location: 'North Avenue',
            type: 'Home Construction',
            status: 'Ongoing',
            completionPercentage: 65,
            description: 'Luxury residential complex with modern amenities and sustainable design.',
            imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
            startDate: '2025-01-15',
            expectedCompletion: '2025-12-01',
            features: ['Swimming Pool', 'Gym', '24/7 Security'],
            isActive: true
        },
        {
            id: 'proj_2',
            name: 'Green Valley Plot',
            location: 'West End',
            type: 'Residential Plots',
            status: 'Planning',
            completionPercentage: 10,
            description: 'Premium plots available for custom home construction in a gated community.',
            imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
            startDate: '2025-06-01',
            expectedCompletion: '2026-01-01',
            features: ['Gated', 'Park', 'Wide Roads'],
            isActive: true
        },
        {
            id: 'proj_3',
            name: 'Tech Park Tower',
            location: 'Business District',
            type: 'Commercial',
            status: 'Completed',
            completionPercentage: 100,
            description: 'State-of-the-art office spaces designed for modern tech companies.',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
            startDate: '2024-01-10',
            expectedCompletion: '2024-11-20',
            features: ['Cafeteria', 'Conference Hall', 'Parking'],
            isActive: true
        }
    ];

    const samplePlots = [
        {
            id: 'plot_1',
            plotNumber: 'A-101',
            location: 'Green Valley',
            size: '2400',
            sizeUnit: 'sq ft',
            price: 4500000,
            status: 'Available',
            amenities: ['Corner Plot', 'East Facing'],
            plotType: 'Residential',
            facing: 'East',
            notes: 'Prime location near park.',
            isActive: true
        },
        {
            id: 'plot_2',
            plotNumber: 'B-205',
            location: 'Green Valley',
            size: '1800',
            sizeUnit: 'sq ft',
            price: 3200000,
            status: 'Reserved',
            amenities: [],
            plotType: 'Residential',
            facing: 'North',
            notes: 'Pending final payment.',
            isActive: true
        },
        {
            id: 'plot_3',
            plotNumber: 'C-003',
            location: 'Sunset Hills',
            size: '300',
            sizeUnit: 'sq yards',
            price: 5500000,
            status: 'Available',
            amenities: ['Gated Community'],
            plotType: 'Residential',
            facing: 'West',
            notes: 'Excellent view.',
            isActive: true
        },
        {
            id: 'plot_4',
            plotNumber: 'D-12',
            location: 'City Outskirts',
            size: '500',
            sizeUnit: 'sq yards',
            price: 2500000,
            status: 'Sold',
            amenities: [],
            plotType: 'Commercial',
            facing: 'South',
            notes: '',
            isActive: true
        }
    ];

    const sampleLocations = [
        {
            id: 'loc_1',
            name: 'Head Office',
            address: '123 Construction Blvd, Blueprint City',
            city: 'Metropolis',
            phone: '+1 234-567-8900',
            email: 'contact@constructioncrafters.com',
            operatingHours: 'Mon-Fri: 9AM - 6PM',
            isPrimary: true,
            isActive: true
        },
        {
            id: 'loc_2',
            name: 'Sales Office',
            address: '45 Green Valley Road',
            city: 'Suburbia',
            phone: '+1 234-555-0199',
            email: 'sales@constructioncrafters.com',
            operatingHours: 'Sat-Sun: 10AM - 4PM',
            isPrimary: false,
            isActive: true
        }
    ];

    const sampleAbout = {
        introduction: "Building your dreams with precision and passion. Construction Crafters has been a serving the community for over 20 years, delivering high-quality homes and commercial spaces.",
        mission: "To provide top-tier construction services that exceed expectations through innovation, integrity, and excellence.",
        experience: "25+ Years",
        coreValues: ["Integrity", "Quality", "Safety", "Innovation"],
        teamHighlights: "Led by a team of certified civil engineers and award-winning architects."
    };

    const sampleFeatures = [
        { id: 'f_1', title: 'Quality Materials', description: 'We use only the best materials.' },
        { id: 'f_2', title: 'Timely Delivery', description: 'We respect your time and deadlines.' },
        { id: 'f_3', title: 'Transparent Pricing', description: 'No hidden costs, ever.' }
    ];

    const samplePricing = [
        { title: 'Basic', price: '1500', features: ['Standard Materials', 'Basic Flooring', 'Standard Fittings'] },
        { title: 'Premium', price: '2200', features: ['Premium Materials', 'Granite Flooring', 'Branded Fittings'] }
    ];

    const sampleWorkProcess = [
        { id: 'step_1', title: "Plan & Design", desc: "Detailed architectural planning", icon: "Ruler" },
        { id: 'step_2', title: "Structure", desc: "Solid foundation & framework", icon: "BrickWall" },
        { id: 'step_3', title: "Finishing", desc: "Premium interiors & exteriors", icon: "PaintBucket" },
        { id: 'step_4', title: "Handover", desc: "Move-in ready delivery", icon: "Key" }
    ];

    // Set Data
    if (!db.get(STORAGE_KEYS.PROJECTS)) db.set(STORAGE_KEYS.PROJECTS, sampleProjects);
    if (!db.get(STORAGE_KEYS.PLOTS)) db.set(STORAGE_KEYS.PLOTS, samplePlots);
    if (!db.get(STORAGE_KEYS.LOCATIONS)) db.set(STORAGE_KEYS.LOCATIONS, sampleLocations);
    if (!db.get(STORAGE_KEYS.ABOUT)) db.set(STORAGE_KEYS.ABOUT, sampleAbout);
    if (!db.get(STORAGE_KEYS.FEATURES)) db.set(STORAGE_KEYS.FEATURES, sampleFeatures);
    if (!db.get(STORAGE_KEYS.PRICING)) db.set(STORAGE_KEYS.PRICING, samplePricing);
    if (!db.get(STORAGE_KEYS.WORK_PROCESS)) db.set(STORAGE_KEYS.WORK_PROCESS, sampleWorkProcess);
    if (!db.get(STORAGE_KEYS.ADMIN_PASS)) db.set(STORAGE_KEYS.ADMIN_PASS, 'admin123'); // Simple plain text for demo as requested, usually hash
};

// Initialize
export const initStorage = () => {
    try {
        if (!db.get(STORAGE_KEYS.PROJECTS)) {
            generateSampleData();
        }
    } catch (e) {
        console.error("Initialization failed", e);
    }
};

export { STORAGE_KEYS };
