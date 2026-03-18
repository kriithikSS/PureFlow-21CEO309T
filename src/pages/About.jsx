import {
  Info, Droplets, Globe, BookOpen, ExternalLink, Database,
  Shield, Users, Target, Waves, Heart, Award
} from 'lucide-react';

const datasetInfo = [
  { name: 'River Water Level', agency: 'CWC', desc: 'Water surface elevation in rivers measured at gauging stations' },
  { name: 'River Water Discharge', agency: 'CWC', desc: 'Volume of water flowing through a river cross-section per unit time' },
  { name: 'Ground Water Level', agency: 'CGWB', desc: 'Depth to water table from ground surface in observation wells' },
  { name: 'Rainfall', agency: 'IMD', desc: 'Precipitation recorded at rain gauge stations' },
  { name: 'Reservoir', agency: 'CWC', desc: 'Storage levels, inflows, and outflows of major reservoirs' },
  { name: 'Suspended Sediment', agency: 'CWC', desc: 'Concentration of solid particles suspended in river water' },
  { name: 'Temperature', agency: 'IMD', desc: 'Ambient air temperature readings from meteorological stations' },
  { name: 'Relative Humidity', agency: 'CWC', desc: 'Atmospheric moisture content as percentage of saturation' },
  { name: 'Wind Direction', agency: 'CWC', desc: 'Direction and speed of wind at monitoring locations' },
  { name: 'Solar Radiation', agency: 'CWC', desc: 'Incoming solar energy measured at radiometric stations' },
  { name: 'Soil Moisture', agency: 'CWC', desc: 'Volumetric water content in soil layers' },
  { name: 'Snowfall', agency: 'CWC', desc: 'Snowfall accumulation in mountainous regions' },
  { name: 'Evapo Transpiration', agency: 'CWC', desc: 'Combined water loss from evaporation and plant transpiration' },
  { name: 'Atmospheric Pressure', agency: 'CWC', desc: 'Barometric pressure readings at monitoring sites' },
];

function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-section" style={{ padding: '32px' }}>
        <div className="hero-content">
          <div className="hero-badge">
            <Info size={14} />
            About PureFlow
          </div>
          <h1 className="hero-title" style={{ fontSize: '26px' }}>
            Water Pollution & <span>Its Management</span>
          </h1>
          <p className="hero-description" style={{ fontSize: '14px' }}>
            PureFlow is a comprehensive dashboard for monitoring India's water resources and understanding 
            water pollution patterns. Built using real-time data from the India Water Resources Information 
            System (WRIS) API, this project provides insights into river water levels, ground water quality, 
            rainfall distribution, and environmental parameters that affect water pollution.
          </p>
        </div>
      </section>

      {/* Mission */}
      <div className="content-grid" style={{ marginBottom: '24px' }}>
        <div className="info-card">
          <div className="info-card-icon" style={{ background: 'rgba(6, 182, 212, 0.12)' }}>
            <Target style={{ color: '#06b6d4' }} />
          </div>
          <h3>Our Mission</h3>
          <p>
            To make India's water resource data accessible and actionable. By visualizing hydro-meteorological 
            data, we aim to support researchers, students, policymakers, and citizens in understanding and 
            addressing water pollution challenges.
          </p>
        </div>
        <div className="info-card">
          <div className="info-card-icon" style={{ background: 'rgba(59, 130, 246, 0.12)' }}>
            <Globe style={{ color: '#3b82f6' }} />
          </div>
          <h3>Scope</h3>
          <p>
            Covering 21+ Indian states with 14 different water and environmental datasets, PureFlow bridges 
            the gap between raw government data and meaningful insights. From river monitoring to ground water 
            analysis, we provide a unified interface.
          </p>
        </div>
        <div className="info-card">
          <div className="info-card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)' }}>
            <Heart style={{ color: '#10b981' }} />
          </div>
          <h3>Why It Matters</h3>
          <p>
            Water pollution kills more people worldwide than all forms of violence combined. In India, 
            contaminated water is responsible for ~70% of disease burden. Access to data is the first step 
            toward effective management and policy-making.
          </p>
        </div>
      </div>

      {/* Data Sources */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <Database size={16} style={{ color: '#8b5cf6' }} />
            Available Datasets (14 Parameters)
          </div>
          <a
            href="https://indiawris.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-secondary"
          >
            <ExternalLink size={12} />
            India WRIS
          </a>
        </div>
        <div className="data-table-wrapper" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dataset</th>
                <th>Primary Agency</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {datasetInfo.map((ds, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{ds.name}</td>
                  <td><span className="tag tag-blue">{ds.agency}</span></td>
                  <td style={{ whiteSpace: 'normal', maxWidth: '400px' }}>{ds.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Info */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <BookOpen size={16} style={{ color: '#06b6d4' }} />
            API Architecture
          </div>
        </div>
        <div className="content-grid" style={{ gap: '12px' }}>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148,163,184,0.06)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Admin Hierarchy
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Query data by <strong>State → District → Agency</strong>. Uses POST requests with query 
              parameters to <code style={{ color: 'var(--accent-cyan)', background: 'rgba(6,182,212,0.1)', padding: '2px 6px', borderRadius: '4px' }}>/Dataset/[name]</code>
            </p>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148,163,184,0.06)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Basin Hierarchy
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Query data by <strong>Basin → Sub-Basin → Agency</strong>. Uses POST requests to 
              <code style={{ color: 'var(--accent-cyan)', background: 'rgba(6,182,212,0.1)', padding: '2px 6px', borderRadius: '4px' }}>/Dataset/Basin/[name]</code>
            </p>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <Award size={16} style={{ color: '#f59e0b' }} />
            Built With
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['React 18', 'Vite', 'Chart.js', 'Leaflet', 'React Router', 'Lucide Icons', 'India WRIS API'].map((tech, i) => (
            <span key={i} className="tag tag-cyan" style={{ padding: '6px 14px', fontSize: '12px' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Attribution */}
      <div className="alert alert-info">
        <Shield size={16} />
        <span>
          All water resource data is sourced from the <strong>India Water Resources Information System (WRIS)</strong>, 
          maintained by the Ministry of Jal Shakti, Government of India. This project is for educational purposes.
        </span>
      </div>
    </div>
  );
}

export default About;
