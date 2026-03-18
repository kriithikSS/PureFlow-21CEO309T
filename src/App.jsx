import { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
  Droplets, LayoutDashboard, Search, Beaker, Map as MapIcon,
  Info, Menu, X, Activity
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import DataExplorer from './pages/DataExplorer';
import WaterQuality from './pages/WaterQuality';
import MapView from './pages/MapView';
import About from './pages/About';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/explorer', label: 'Data Explorer', icon: Search },
  { path: '/quality', label: 'Water Quality', icon: Beaker },
  { path: '/map', label: 'Map View', icon: MapIcon },
  { path: '/about', label: 'About', icon: Info },
];

const pageNames = {
  '/': 'Dashboard',
  '/explorer': 'Data Explorer',
  '/quality': 'Water Quality & Pollution',
  '/map': 'Map View',
  '/about': 'About',
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Droplets />
          </div>
          <div className="sidebar-brand">
            <h1>PureFlow</h1>
            <span>Water Intelligence</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-title">Navigation</span>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
              end={item.path === '/'}
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}

          <span className="nav-section-title" style={{ marginTop: '16px' }}>Data Sources</span>
          <div className="nav-item" style={{ cursor: 'default', opacity: 0.6 }}>
            <Activity size={18} />
            <span style={{ fontSize: '12px' }}>India WRIS API</span>
            <span className="tag tag-green" style={{ marginLeft: 'auto', fontSize: '9px' }}>LIVE</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-info">
            Powered by{' '}
            <a href="https://indiawris.gov.in" target="_blank" rel="noopener noreferrer">
              India WRIS
            </a>
            <br />
            Water Pollution & Management
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-left">
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="top-bar-title">
              {pageNames[location.pathname] || 'PureFlow'}
            </h2>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-badge">
              <Droplets size={12} style={{ display: 'inline', verticalAlign: '-2px' }} /> 14 Datasets
            </span>
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explorer" element={<DataExplorer />} />
            <Route path="/quality" element={<WaterQuality />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
