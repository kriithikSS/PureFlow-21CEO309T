import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Map as MapIcon, Droplets, Waves, Info } from 'lucide-react';
import { STATES, STATE_COORDS, INDIA_CENTER } from '../data/states';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Simulated water quality index for states
const stateWaterQuality = {
  'Andhra Pradesh': { wqi: 72, status: 'Moderate', color: '#f59e0b' },
  'Assam': { wqi: 68, status: 'Moderate', color: '#f59e0b' },
  'Bihar': { wqi: 42, status: 'Poor', color: '#f43f5e' },
  'Chhattisgarh': { wqi: 65, status: 'Moderate', color: '#f59e0b' },
  'Goa': { wqi: 81, status: 'Good', color: '#10b981' },
  'Gujarat': { wqi: 58, status: 'Moderate', color: '#f59e0b' },
  'Haryana': { wqi: 48, status: 'Poor', color: '#f43f5e' },
  'Himachal Pradesh': { wqi: 88, status: 'Good', color: '#10b981' },
  'Jharkhand': { wqi: 52, status: 'Poor', color: '#f43f5e' },
  'Karnataka': { wqi: 71, status: 'Moderate', color: '#f59e0b' },
  'Kerala': { wqi: 79, status: 'Good', color: '#10b981' },
  'Madhya Pradesh': { wqi: 63, status: 'Moderate', color: '#f59e0b' },
  'Maharashtra': { wqi: 55, status: 'Moderate', color: '#f59e0b' },
  'Odisha': { wqi: 66, status: 'Moderate', color: '#f59e0b' },
  'Punjab': { wqi: 45, status: 'Poor', color: '#f43f5e' },
  'Rajasthan': { wqi: 50, status: 'Poor', color: '#f43f5e' },
  'Tamil Nadu': { wqi: 69, status: 'Moderate', color: '#f59e0b' },
  'Telangana': { wqi: 61, status: 'Moderate', color: '#f59e0b' },
  'Uttar Pradesh': { wqi: 38, status: 'Poor', color: '#f43f5e' },
  'Uttarakhand': { wqi: 85, status: 'Good', color: '#10b981' },
  'West Bengal': { wqi: 54, status: 'Moderate', color: '#f59e0b' },
};

function MapView() {
  const stateMarkers = useMemo(() => {
    return STATES.map(s => {
      const coords = STATE_COORDS[s.name];
      const quality = stateWaterQuality[s.name];
      if (!coords || !quality) return null;
      return { name: s.name, coords, quality, districts: s.districts.length };
    }).filter(Boolean);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-section" style={{ padding: '24px 32px', marginBottom: '20px' }}>
        <div className="hero-content">
          <div className="hero-badge">
            <MapIcon size={14} />
            Interactive Map
          </div>
          <h1 className="hero-title" style={{ fontSize: '24px' }}>
            Water Quality <span>Across India</span>
          </h1>
          <p className="hero-description" style={{ fontSize: '14px' }}>
            Explore water quality indicators across Indian states. Color-coded markers show the 
            Water Quality Index (WQI) — green is good, amber is moderate, red indicates poor quality.
          </p>
        </div>
      </section>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[
          { color: '#10b981', label: 'Good (WQI > 75)' },
          { color: '#f59e0b', label: 'Moderate (WQI 50-75)' },
          { color: '#f43f5e', label: 'Poor (WQI < 50)' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="map-container" style={{ height: '550px' }}>
        <MapContainer
          center={INDIA_CENTER}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {stateMarkers.map((marker, i) => (
            <CircleMarker
              key={i}
              center={marker.coords}
              radius={Math.max(8, marker.quality.wqi / 8)}
              fillColor={marker.quality.color}
              fillOpacity={0.7}
              color={marker.quality.color}
              weight={2}
              opacity={0.9}
            >
              <Popup>
                <div className="map-popup">
                  <h3 style={{ color: '#1e293b' }}>{marker.name}</h3>
                  <p><strong>Water Quality Index:</strong> {marker.quality.wqi}/100</p>
                  <p><strong>Status:</strong> <span style={{ color: marker.quality.color, fontWeight: 600 }}>{marker.quality.status}</span></p>
                  <p><strong>Districts monitored:</strong> {marker.districts}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                    Click "Data Explorer" to query live data for this state
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid" style={{ marginTop: '20px' }}>
        {[
          { icon: <Droplets />, value: stateMarkers.filter(m => m.quality.status === 'Good').length, label: 'States with Good WQI', color: '#10b981' },
          { icon: <Waves />, value: stateMarkers.filter(m => m.quality.status === 'Moderate').length, label: 'States with Moderate WQI', color: '#f59e0b' },
          { icon: <Info />, value: stateMarkers.filter(m => m.quality.status === 'Poor').length, label: 'States with Poor WQI', color: '#f43f5e' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: `${stat.color}20` }}>
              <span style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapView;
