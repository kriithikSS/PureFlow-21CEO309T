import { useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Filler, Tooltip, Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  Search, Download, BarChart3, Table2, Play, AlertCircle,
  ChevronLeft, ChevronRight, Loader2, RefreshCw
} from 'lucide-react';
import { STATES, AGENCIES } from '../data/states';
import { DATASETS } from '../services/wrisApi';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Filler, Tooltip, Legend
);

const chartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, usePointStyle: true } },
    tooltip: {
      backgroundColor: '#1e293b', titleColor: '#f1f5f9', bodyColor: '#94a3b8',
      borderColor: 'rgba(148,163,184,0.15)', borderWidth: 1, cornerRadius: 8, padding: 12,
    }
  },
  scales: {
    x: { grid: { color: 'rgba(148,163,184,0.06)' }, ticks: { color: '#64748b', font: { family: 'Inter', size: 10 }, maxRotation: 45 } },
    y: { grid: { color: 'rgba(148,163,184,0.06)' }, ticks: { color: '#64748b', font: { family: 'Inter', size: 10 } } }
  },
  elements: { point: { radius: 2, hoverRadius: 5 }, line: { tension: 0.4, borderWidth: 2 } }
};

function DataExplorer() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [agency, setAgency] = useState('CWC');
  const [datasetId, setDatasetId] = useState('ground-water-level');
  const [startDate, setStartDate] = useState('2023-11-01');
  const [endDate, setEndDate] = useState('2024-10-31');
  const [page, setPage] = useState(0);
  const [size] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [message, setMessage] = useState('');

  const selectedState = STATES.find(s => s.name === state);
  const selectedDataset = DATASETS.find(d => d.id === datasetId);

  const handleFetch = useCallback(async (pageNum = 0) => {
    if (!state || !district || !agency || !startDate || !endDate) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    setError('');
    setData(null);
    setMessage('');

    try {
      const result = await selectedDataset.fetch(state, district, agency, startDate, endDate, pageNum, size);
      
      if (result.statusCode === 200 && result.data && result.data.length > 0) {
        setData(result.data);
        setMessage(result.message || `Found ${result.data.length} records`);
        setPage(pageNum);
      } else {
        setData([]);
        setMessage(result.message || 'No data found for the given criteria.');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [state, district, agency, startDate, endDate, size, selectedDataset]);

  const getTableColumns = () => {
    if (!data || data.length === 0) return [];
    const sample = data[0];
    return Object.keys(sample).filter(k =>
      !['_id', '__v', 'id'].includes(k.toLowerCase())
    );
  };

  const buildChartData = () => {
    if (!data || data.length === 0) return null;
    const columns = getTableColumns();
    const dateCol = columns.find(c => c.toLowerCase().includes('date') || c.toLowerCase().includes('time'));
    const numericCols = columns.filter(c => {
      if (c === dateCol) return false;
      return data.some(row => !isNaN(parseFloat(row[c])));
    }).slice(0, 3);

    if (!dateCol && numericCols.length === 0) return null;

    const labels = data.map((row, i) => {
      if (dateCol) {
        const d = row[dateCol];
        return typeof d === 'string' ? d.split('T')[0] : `${i + 1}`;
      }
      return `${i + 1}`;
    });

    const colors = ['#3b82f6', '#06b6d4', '#10b981'];

    return {
      labels,
      datasets: numericCols.map((col, i) => ({
        label: col,
        data: data.map(row => parseFloat(row[col]) || 0),
        borderColor: colors[i % 3],
        backgroundColor: `${colors[i % 3]}15`,
        fill: i === 0,
        borderWidth: 2,
      }))
    };
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-section" style={{ padding: '28px 32px', marginBottom: '20px' }}>
        <div className="hero-content">
          <div className="hero-badge">
            <Search size={14} />
            Data Explorer
          </div>
          <h1 className="hero-title" style={{ fontSize: '24px' }}>
            Query <span>India WRIS</span> Live Data
          </h1>
          <p className="hero-description" style={{ fontSize: '14px' }}>
            Select parameters and date ranges to fetch real-time water resource data from 14 different datasets.
          </p>
        </div>
      </section>

      {/* Query Builder */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <div className="card-title">
            <Search size={16} style={{ color: '#3b82f6' }} />
            Query Builder
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Dataset</label>
            <select className="form-select" value={datasetId} onChange={e => setDatasetId(e.target.value)}>
              {DATASETS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">State *</label>
            <select className="form-select" value={state} onChange={e => { setState(e.target.value); setDistrict(''); }}>
              <option value="">Select State</option>
              {STATES.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">District *</label>
            <select className="form-select" value={district} onChange={e => setDistrict(e.target.value)} disabled={!state}>
              <option value="">Select District</option>
              {selectedState?.districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Agency *</label>
            <select className="form-select" value={agency} onChange={e => setAgency(e.target.value)}>
              {AGENCIES.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Start Date *</label>
            <input type="date" className="form-input" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">End Date *</label>
            <input type="date" className="form-input" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" onClick={() => handleFetch(0)} disabled={loading} style={{ width: '100%' }}>
              {loading ? <Loader2 size={16} className="spin" /> : <Play size={16} />}
              {loading ? 'Fetching...' : 'Fetch Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Message */}
      {message && !error && (
        <div className={`alert ${data && data.length > 0 ? 'alert-success' : 'alert-warning'}`}>
          <AlertCircle size={16} />
          {message}
        </div>
      )}

      {/* Results */}
      {data && data.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <BarChart3 size={16} style={{ color: '#10b981' }} />
              Results — {data.length} records
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="tabs" style={{ marginBottom: 0 }}>
                <button className={`tab ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>
                  <Table2 size={12} style={{ marginRight: 4, display: 'inline', verticalAlign: '-2px' }} />
                  Table
                </button>
                <button className={`tab ${viewMode === 'chart' ? 'active' : ''}`} onClick={() => setViewMode('chart')}>
                  <BarChart3 size={12} style={{ marginRight: 4, display: 'inline', verticalAlign: '-2px' }} />
                  Chart
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'table' ? (
            <>
              <div className="data-table-wrapper" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      {getTableColumns().map(col => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr key={i}>
                        {getTableColumns().map(col => (
                          <td key={col}>
                            {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="table-pagination">
                <span>Page {page + 1}</span>
                <div className="table-pagination-controls">
                  <button className="btn-icon" onClick={() => handleFetch(Math.max(0, page - 1))} disabled={page === 0 || loading}>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="btn-icon" onClick={() => handleFetch(page + 1)} disabled={loading || (data && data.length < size)}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="chart-container" style={{ height: '350px' }}>
              {buildChartData() ? (
                <Line data={buildChartData()} options={chartOpts} />
              ) : (
                <div className="empty-state">
                  <BarChart3 />
                  <h3>No numeric data to chart</h3>
                  <p>The returned dataset doesn&apos;t contain plottable numeric columns.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {data && data.length === 0 && !loading && (
        <div className="card">
          <div className="empty-state">
            <Search />
            <h3>No Data Found</h3>
            <p>No records match the selected criteria. Try adjusting the state, district, dates, or agency and search again.</p>
            <button className="btn btn-secondary" onClick={() => handleFetch(0)} style={{ marginTop: '12px' }}>
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="card">
          <div className="loader">
            <div className="water-drop" />
            <div className="loader-text">Fetching data from India WRIS...</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataExplorer;
