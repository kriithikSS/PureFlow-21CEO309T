import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Filler, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Droplets, Waves, CloudRain, Thermometer, Wind, Gauge,
  TrendingUp, TrendingDown, Activity, Database, Globe, BarChart3
} from 'lucide-react';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Filler, Tooltip, Legend, ArcElement
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      display: true, 
      position: 'top',
      labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, padding: 16, usePointStyle: true }
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      borderColor: 'rgba(148,163,184,0.15)',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      titleFont: { family: 'Inter', weight: 600 },
      bodyFont: { family: 'Inter' },
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(148,163,184,0.06)', drawBorder: false },
      ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } }
    },
    y: {
      grid: { color: 'rgba(148,163,184,0.06)', drawBorder: false },
      ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } }
    }
  },
  elements: {
    point: { radius: 3, hoverRadius: 6 },
    line: { tension: 0.4, borderWidth: 2 }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      position: 'bottom',
      labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, padding: 16, usePointStyle: true }
    }
  },
  cutout: '65%'
};

// Sample data for visualizations
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const riverLevelData = {
  labels: months,
  datasets: [
    {
      label: 'Karnataka - Water Level (m)',
      data: [4.2, 3.8, 3.5, 3.1, 2.8, 5.6, 8.9, 12.3, 10.1, 7.4, 5.2, 4.5],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.08)',
      fill: true,
    },
    {
      label: 'Andhra Pradesh - Water Level (m)',
      data: [3.6, 3.2, 2.9, 2.5, 2.3, 4.8, 7.6, 10.8, 9.2, 6.8, 4.6, 3.9],
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.08)',
      fill: true,
    }
  ]
};

const rainfallData = {
  labels: months,
  datasets: [{
    label: 'Rainfall (mm)',
    data: [12, 8, 15, 32, 85, 245, 312, 298, 186, 98, 28, 14],
    backgroundColor: [
      'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.6)',
      'rgba(6, 182, 212, 0.6)', 'rgba(6, 182, 212, 0.6)', 'rgba(16, 185, 129, 0.6)',
      'rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(6, 182, 212, 0.6)',
      'rgba(6, 182, 212, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.6)',
    ],
    borderRadius: 6,
    borderSkipped: false,
  }]
};

const pollutionSourceData = {
  labels: ['Industrial', 'Agricultural', 'Domestic', 'Mining', 'Urban Runoff'],
  datasets: [{
    data: [35, 25, 22, 10, 8],
    backgroundColor: [
      'rgba(244, 63, 94, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(100, 116, 139, 0.8)',
      'rgba(6, 182, 212, 0.8)'
    ],
    borderWidth: 0,
    hoverOffset: 8,
  }]
};

const groundWaterData = {
  labels: months,
  datasets: [{
    label: 'Ground Water Level (m below ground)',
    data: [8.2, 8.8, 9.3, 9.8, 10.5, 9.1, 6.4, 4.8, 5.2, 6.1, 7.1, 7.8],
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    fill: true,
  }]
};

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { icon: <Globe />, value: '21', label: 'States Monitored', trend: '+2 this year', trendDir: 'up', color: '#3b82f6' },
    { icon: <Activity />, value: '14', label: 'Data Parameters', trend: 'All active', trendDir: 'up', color: '#06b6d4' },
    { icon: <Droplets />, value: '5,000+', label: 'Monitoring Stations', trend: 'Network expanding', trendDir: 'up', color: '#10b981' },
    { icon: <Database />, value: '1M+', label: 'Records Available', trend: 'Updated daily', trendDir: 'up', color: '#8b5cf6' },
  ];

  return (
    <div className={isLoaded ? 'animate-fade-in' : ''}>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Droplets size={14} />
            Water Pollution & Management Dashboard
          </div>
          <h1 className="hero-title">
            Monitor India's <span>Water Resources</span> in Real-Time
          </h1>
          <p className="hero-description">
            Access comprehensive hydro-meteorological data from the India Water Resources Information 
            System (WRIS). Track river levels, ground water quality, rainfall patterns, and more 
            across 21 states and multiple river basins.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card animate-fade-in-up stagger-${i + 1}`}>
            <div className="stat-icon" style={{ background: `${stat.color}20` }}>
              <span style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-trend ${stat.trendDir}`}>
              {stat.trendDir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Waves size={16} style={{ color: '#3b82f6' }} />
                River Water Level Trends
              </div>
              <div className="card-subtitle">Monthly average water levels (meters)</div>
            </div>
            <span className="tag tag-blue">2024</span>
          </div>
          <div className="chart-container">
            <Line data={riverLevelData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <CloudRain size={16} style={{ color: '#06b6d4' }} />
                Rainfall Distribution
              </div>
              <div className="card-subtitle">Monthly rainfall in mm</div>
            </div>
            <span className="tag tag-cyan">Avg</span>
          </div>
          <div className="chart-container">
            <Bar data={rainfallData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Droplets size={16} style={{ color: '#10b981' }} />
                Ground Water Level Trends
              </div>
              <div className="card-subtitle">Meters below ground level — lower is better</div>
            </div>
            <span className="tag tag-green">Odisha</span>
          </div>
          <div className="chart-container">
            <Line data={groundWaterData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <BarChart3 size={16} style={{ color: '#f43f5e' }} />
                Water Pollution Sources
              </div>
              <div className="card-subtitle">Major contributors to water pollution in India</div>
            </div>
            <span className="tag tag-rose">Analysis</span>
          </div>
          <div className="chart-container">
            <Doughnut data={pollutionSourceData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="content-grid" style={{ marginTop: '24px' }}>
        <div className="info-card">
          <div className="info-card-icon" style={{ background: 'rgba(244, 63, 94, 0.12)' }}>
            <Thermometer style={{ color: '#f43f5e' }} />
          </div>
          <h3>Key Pollution Indicators</h3>
          <p>The suspended sediment concentration, river discharge rates, and ground water levels are critical indicators for monitoring water pollution levels across Indian rivers.</p>
        </div>

        <div className="info-card">
          <div className="info-card-icon" style={{ background: 'rgba(6, 182, 212, 0.12)' }}>
            <Waves style={{ color: '#06b6d4' }} />
          </div>
          <h3>Real-Time Monitoring</h3>
          <p>Data is collected from thousands of monitoring stations operated by CWC, CGWB, and IMD across India. Use the Data Explorer to query live datasets.</p>
        </div>

        <div className="info-card">
          <div className="info-card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)' }}>
            <Wind style={{ color: '#10b981' }} />
          </div>
          <h3>Environmental Factors</h3>
          <p>Temperature, humidity, wind direction, and atmospheric pressure all influence water quality. Track these parameters alongside water metrics for comprehensive analysis.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
