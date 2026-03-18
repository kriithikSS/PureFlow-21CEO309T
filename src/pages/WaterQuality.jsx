import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Filler, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Beaker, Factory, Tractor, HomeIcon, Construction, Droplets,
  AlertTriangle, Shield, Leaf, Recycle, ArrowRight, Waves, ThermometerSun
} from 'lucide-react';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Filler, Tooltip, Legend, ArcElement
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, usePointStyle: true } },
    tooltip: { backgroundColor: '#1e293b', titleColor: '#f1f5f9', bodyColor: '#94a3b8', cornerRadius: 8, padding: 12 }
  },
  scales: {
    x: { grid: { color: 'rgba(148,163,184,0.06)' }, ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } } },
    y: { grid: { color: 'rgba(148,163,184,0.06)' }, ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } } }
  }
};

const doughnutOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, padding: 14, usePointStyle: true } } },
  cutout: '60%'
};

const pollutantData = {
  labels: ['Heavy Metals', 'Organic Waste', 'Pesticides', 'Nutrients', 'Pathogens', 'Sediment'],
  datasets: [{
    data: [18, 28, 15, 20, 12, 7],
    backgroundColor: [
      'rgba(244, 63, 94, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(139, 92, 246, 0.8)',
      'rgba(6, 182, 212, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(100, 116, 139, 0.8)'
    ],
    borderWidth: 0, hoverOffset: 8
  }]
};

const sedimentTrend = {
  labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  datasets: [{
    label: 'Suspended Sediment (mg/L)',
    data: [245, 262, 238, 278, 295, 310, 288],
    borderColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    fill: true, tension: 0.4, borderWidth: 2
  }]
};

const waterQualityByState = {
  labels: ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Odisha', 'Bihar', 'UP', 'West Bengal'],
  datasets: [{
    label: 'BOD (mg/L)',
    data: [4.2, 3.1, 2.8, 3.5, 5.8, 6.2, 4.9],
    backgroundColor: 'rgba(244, 63, 94, 0.7)',
    borderRadius: 6, borderSkipped: false,
  }, {
    label: 'DO (mg/L)',
    data: [5.8, 7.2, 7.5, 6.4, 4.1, 3.8, 5.1],
    backgroundColor: 'rgba(6, 182, 212, 0.7)',
    borderRadius: 6, borderSkipped: false,
  }]
};

const pollutionTypes = [
  {
    icon: <Factory />,
    title: 'Industrial Pollution',
    color: '#f43f5e',
    desc: 'Discharge of heavy metals, chemicals, and thermal pollutants from factories. Major industries include textiles, paper, chemicals, and mining.',
    indicators: ['Heavy metals (Pb, Hg, Cd)', 'Chemical Oxygen Demand (COD)', 'Total Dissolved Solids (TDS)', 'Thermal pollution'],
    severity: 'High',
  },
  {
    icon: <Tractor />,
    title: 'Agricultural Pollution',
    color: '#f59e0b',
    desc: 'Runoff containing pesticides, fertilizers, and animal waste that causes eutrophication and groundwater contamination.',
    indicators: ['Nitrates & Phosphates', 'Pesticide residues', 'Suspended sediment', 'Biological Oxygen Demand (BOD)'],
    severity: 'High',
  },
  {
    icon: <HomeIcon />,
    title: 'Domestic Sewage',
    color: '#8b5cf6',
    desc: 'Untreated or partially treated municipal wastewater containing organic matter, pathogens, and detergents.',
    indicators: ['Coliform bacteria', 'BOD levels', 'Dissolved Oxygen (DO)', 'Detergents & surfactants'],
    severity: 'Medium',
  },
  {
    icon: <Construction />,
    title: 'Urban Runoff',
    color: '#06b6d4',
    desc: 'Stormwater carrying oil, rubber, heavy metals, and litter from roads and urban surfaces into water bodies.',
    indicators: ['Oil & grease', 'Microplastics', 'Heavy metals', 'Trash & debris'],
    severity: 'Medium',
  },
];

const managementStrategies = [
  {
    icon: <Shield />,
    title: 'Effluent Treatment Plants (ETP)',
    color: '#3b82f6',
    desc: 'Mandate ETPs for all industrial units. The Central Pollution Control Board (CPCB) enforces discharge standards to limit pollutant levels.',
  },
  {
    icon: <Recycle />,
    title: 'Sewage Treatment Plants (STP)',
    color: '#10b981',
    desc: 'Expand STP capacity to treat 100% of urban sewage. Namami Gange program aims to build 150+ STPs along the Ganga basin.',
  },
  {
    icon: <Leaf />,
    title: 'Wetland Restoration',
    color: '#84cc16',
    desc: 'Natural wetlands act as bio-filters, removing pollutants. Protecting and restoring wetlands is a cost-effective pollution management strategy.',
  },
  {
    icon: <Waves />,
    title: 'Real-Time Monitoring',
    color: '#06b6d4',
    desc: 'Deploy IoT sensors for continuous water quality monitoring. India WRIS provides data from thousands of stations for evidence-based management.',
  },
];

function WaterQuality() {
  const [activeTab, setActiveTab] = useState('pollution');

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-section" style={{ padding: '28px 32px', marginBottom: '20px' }}>
        <div className="hero-content">
          <div className="hero-badge">
            <Beaker size={14} />
            Water Quality Analysis
          </div>
          <h1 className="hero-title" style={{ fontSize: '24px' }}>
            Understanding <span>Water Pollution</span> in India
          </h1>
          <p className="hero-description" style={{ fontSize: '14px' }}>
            Explore pollution types, key quality indicators, sediment analysis, and management strategies 
            for India's water bodies. Data sourced from India WRIS monitoring network.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'pollution' ? 'active' : ''}`} onClick={() => setActiveTab('pollution')}>
          Pollution Types
        </button>
        <button className={`tab ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>
          Data Analysis
        </button>
        <button className={`tab ${activeTab === 'management' ? 'active' : ''}`} onClick={() => setActiveTab('management')}>
          Management
        </button>
      </div>

      {/* TAB: Pollution Types */}
      {activeTab === 'pollution' && (
        <>
          <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {pollutionTypes.map((type, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon" style={{ background: `${type.color}18` }}>
                  <span style={{ color: type.color }}>{type.icon}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0 }}>{type.title}</h3>
                  <span className={`tag ${type.severity === 'High' ? 'tag-rose' : 'tag-amber'}`}>
                    {type.severity}
                  </span>
                </div>
                <p>{type.desc}</p>
                <ul>
                  {type.indicators.map((ind, j) => (
                    <li key={j}>{ind}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Fact Alert */}
          <div className="alert alert-warning" style={{ marginTop: '20px' }}>
            <AlertTriangle size={16} />
            <span>
              <strong>Critical:</strong> Over 70% of India&apos;s surface water is contaminated, and 
              nearly 80% of urban sewage enters water bodies untreated. — CPCB Report
            </span>
          </div>
        </>
      )}

      {/* TAB: Data Analysis */}
      {activeTab === 'analysis' && (
        <>
          <div className="charts-grid">
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <Beaker size={16} style={{ color: '#f43f5e' }} />
                    Pollutant Distribution
                  </div>
                  <div className="card-subtitle">Major pollutant categories in Indian rivers</div>
                </div>
              </div>
              <div className="chart-container" style={{ height: '300px' }}>
                <Doughnut data={pollutantData} options={doughnutOpts} />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <ThermometerSun size={16} style={{ color: '#f59e0b' }} />
                    Suspended Sediment Trend
                  </div>
                  <div className="card-subtitle">Rising sediment levels indicate erosion & pollution</div>
                </div>
                <span className="tag tag-amber">7 Years</span>
              </div>
              <div className="chart-container">
                <Line data={sedimentTrend} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-header">
              <div>
                <div className="card-title">
                  <Droplets size={16} style={{ color: '#06b6d4' }} />
                  Water Quality by State — BOD vs DO
                </div>
                <div className="card-subtitle">
                  BOD (Biological Oxygen Demand) higher = more polluted. DO (Dissolved Oxygen) higher = healthier.
                </div>
              </div>
            </div>
            <div className="chart-container" style={{ height: '300px' }}>
              <Bar data={waterQualityByState} options={chartOptions} />
            </div>
          </div>
        </>
      )}

      {/* TAB: Management */}
      {activeTab === 'management' && (
        <>
          <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {managementStrategies.map((s, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon" style={{ background: `${s.color}18` }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Government Initiatives */}
          <div className="card" style={{ marginTop: '24px' }}>
            <div className="card-header">
              <div className="card-title">
                <Shield size={16} style={{ color: '#3b82f6' }} />
                Government Initiatives
              </div>
            </div>
            <div className="content-grid" style={{ gap: '12px' }}>
              {[
                { name: 'Namami Gange Programme', budget: '₹20,000 Cr', target: 'Clean Ganga by 2026', status: 'Active' },
                { name: 'National Water Mission', budget: '₹5,000 Cr', target: '20% water use efficiency', status: 'Active' },
                { name: 'Jal Jeevan Mission', budget: '₹3.60 Lakh Cr', target: 'Tap water to all rural homes', status: 'Active' },
                { name: 'AMRUT 2.0', budget: '₹2.87 Lakh Cr', target: 'Urban water supply & sewage', status: 'Active' },
              ].map((init, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px', borderRadius: '10px', background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid rgba(148,163,184,0.06)'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{init.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Budget: {init.budget} • Target: {init.target}
                    </div>
                  </div>
                  <span className="tag tag-green">{init.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="alert alert-info" style={{ marginTop: '20px' }}>
            <Droplets size={16} />
            <span>
              Use the <strong>Data Explorer</strong> to query real-time suspended sediment, river discharge, 
              and ground water data from India WRIS for evidence-based pollution assessment.
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default WaterQuality;
