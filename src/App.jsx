
import React, { useState, useEffect } from 'react';
import { initStorage, db, STORAGE_KEYS } from './utils/storageUtils';

// Public Public Components
import Header from './components/public/Header';
import Hero from './components/public/Hero';
import About from './components/public/About';
import ProjectGrid from './components/public/ProjectGrid';
import PlotGrid from './components/public/PlotGrid';
import Services from './components/public/Services';
import Pricing from './components/public/Pricing';
import Contact from './components/public/Contact';
import Footer from './components/public/Footer';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProjectManager from './components/admin/ProjectManager';
import PlotManager from './components/admin/PlotManager';
import LocationManager from './components/admin/LocationManager';
import ContentEditor from './components/admin/ContentEditor';
import ServiceManager from './components/admin/ServiceManager';
import PricingManager from './components/admin/PricingManager';

// Admin Login Modal
const AdminLogin = ({ onLogin, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Host Admin Access</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const pass = e.target.password.value;
        const storedPass = db.get(STORAGE_KEYS.ADMIN_PASS) || 'admin123';
        if (pass === storedPass) onLogin();
        else alert('Invalid Password');
      }}>
        <input type="password" name="password" placeholder="Enter Password" className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-primary" />
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="flex-1 py-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
          <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-secondary font-bold">Login</button>
        </div>
      </form>
    </div>
  </div>
);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentAdminSection, setCurrentAdminSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // App Data State
  const [data, setData] = useState({
    projects: [],
    plots: [],
    locations: [],
    about: null,
    pricing: [],
    workProcess: []
  });

  // Load Data
  const loadData = () => {
    setData({
      projects: db.get(STORAGE_KEYS.PROJECTS) || [],
      plots: db.get(STORAGE_KEYS.PLOTS) || [],
      locations: db.get(STORAGE_KEYS.LOCATIONS) || [],
      about: db.get(STORAGE_KEYS.ABOUT) || {},
      pricing: db.get(STORAGE_KEYS.PRICING) || [],
      workProcess: db.get(STORAGE_KEYS.WORK_PROCESS) || []
    });
    setIsLoading(false);
  };

  useEffect(() => {
    initStorage();
    loadData();
  }, []);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowLoginModal(false);
    setCurrentAdminSection('dashboard');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    loadData(); // Reload data
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center text-primary font-bold animate-pulse">Loading Construction Crafters...</div>;

  return (
    <div className="min-h-screen bg-background font-sans text-secondary selection:bg-accent/30 selection:text-text-primary">
      {/* Admin Login Modal */}
      {showLoginModal && !isAdmin && (
        <AdminLogin onLogin={handleAdminLogin} onCancel={() => setShowLoginModal(false)} />
      )}

      {isAdmin ? (
        <AdminLayout
          onLogout={handleLogout}
          currentSection={currentAdminSection}
          onNavigate={setCurrentAdminSection}
        >
          {currentAdminSection === 'dashboard' && <Dashboard data={data} />}
          {currentAdminSection === 'projects' && <ProjectManager projects={data.projects} onUpdate={loadData} />}
          {currentAdminSection === 'plots' && <PlotManager plots={data.plots} onUpdate={loadData} />}
          {currentAdminSection === 'locations' && <LocationManager locations={data.locations} onUpdate={loadData} />}
          {currentAdminSection === 'content' && <ContentEditor data={data.about} onUpdate={loadData} />}
          {currentAdminSection === 'services' && <ServiceManager processSteps={data.workProcess} onUpdate={loadData} />}
          {currentAdminSection === 'pricing' && <PricingManager pricing={data.pricing} onUpdate={loadData} />}
          {currentAdminSection === 'settings' && <div className="p-10 text-center text-gray-500">Settings Module (Placeholder)</div>}
        </AdminLayout>
      ) : (
        <>
          <Header
            navigate={scrollToSection}
            onOpenQuote={() => scrollToSection('contact')}
            onAdminClick={() => setShowLoginModal(true)}
          />

          <main>
            <Hero onNavigate={scrollToSection} />
            <About data={data.about} />
            <ProjectGrid projects={data.projects} />
            <PlotGrid plots={data.plots} />
            <Services processSteps={data.workProcess} />
            <Pricing pricing={data.pricing} />
            <Contact locations={data.locations} />
          </main>

          <Footer onAdminLogin={() => setShowLoginModal(true)} />
        </>
      )}
    </div>
  );
}

export default App;

