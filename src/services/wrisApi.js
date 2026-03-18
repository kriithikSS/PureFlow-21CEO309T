const BASE_URL = '/api/Dataset';

function buildUrl(endpoint, params) {
  const url = new URL(`${BASE_URL}/${endpoint}`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
}

async function fetchDataset(endpoint, params) {
  const url = buildUrl(endpoint, params);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'accept': 'application/json' },
      body: ''
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return { statusCode: 500, message: error.message, data: [] };
  }
}

function createFetcher(endpoint) {
  return (stateName, districtName, agencyName, startdate, enddate, page = 0, size = 30) =>
    fetchDataset(endpoint, { stateName, districtName, agencyName, startdate, enddate, download: false, page, size });
}

function createBasinFetcher(endpoint) {
  return (basinName, subBasinName, agencyName, startdate, enddate, page = 0, size = 30) =>
    fetchDataset(`Basin/${endpoint}`, { basinName, subBasinName, agencyName, startdate, enddate, download: false, page, size });
}

// Admin hierarchy endpoints
export const fetchRiverWaterLevel = createFetcher('River Water Level');
export const fetchRiverWaterDischarge = createFetcher('River Water Discharge');
export const fetchGroundWaterLevel = createFetcher('Ground Water Level');
export const fetchRainfall = createFetcher('RainFall');
export const fetchReservoir = createFetcher('Reservoir');
export const fetchSuspendedSediment = createFetcher('Suspended Sediment');
export const fetchTemperature = createFetcher('Temperature');
export const fetchRelativeHumidity = createFetcher('Relative Humidity');
export const fetchWindDirection = createFetcher('Wind Direction');
export const fetchSolarRadiation = createFetcher('Solar Radiation');
export const fetchSoilMoisture = createFetcher('Soil Moisture');
export const fetchSnowfall = createFetcher('SnowFall');
export const fetchEvapotranspiration = createFetcher('Evapo Transpiration');
export const fetchAtmosphericPressure = createFetcher('Atmospheric Pressure');

// Basin hierarchy endpoints
export const fetchBasinRiverWaterLevel = createBasinFetcher('River WaterLevel');
export const fetchBasinRiverWaterDischarge = createBasinFetcher('River Water Discharge');
export const fetchBasinRainfall = createBasinFetcher('RainFall');
export const fetchBasinReservoir = createBasinFetcher('Reservoir');
export const fetchBasinSuspendedSediment = createBasinFetcher('Suspended Sediment');
export const fetchBasinTemperature = createBasinFetcher('Temperature');
export const fetchBasinRelativeHumidity = createBasinFetcher('Relative Humidity');
export const fetchBasinWindDirection = createBasinFetcher('Wind Direction');
export const fetchBasinSolarRadiation = createBasinFetcher('Solar Radiation');
export const fetchBasinSoilMoisture = createBasinFetcher('Soil Moisture');
export const fetchBasinSnowfall = createBasinFetcher('SnowFall');
export const fetchBasinEvapotranspiration = createBasinFetcher('Evapo Transpiration');
export const fetchBasinAtmosphericPressure = createBasinFetcher('Atmospheric Pressure');

// Dataset metadata
export const DATASETS = [
  { id: 'river-water-level', name: 'River Water Level', fetch: fetchRiverWaterLevel, icon: 'waves', color: '#3b82f6' },
  { id: 'river-water-discharge', name: 'River Water Discharge', fetch: fetchRiverWaterDischarge, icon: 'activity', color: '#06b6d4' },
  { id: 'ground-water-level', name: 'Ground Water Level', fetch: fetchGroundWaterLevel, icon: 'droplets', color: '#10b981' },
  { id: 'rainfall', name: 'Rainfall', fetch: fetchRainfall, icon: 'cloud-rain', color: '#6366f1' },
  { id: 'reservoir', name: 'Reservoir', fetch: fetchReservoir, icon: 'database', color: '#8b5cf6' },
  { id: 'suspended-sediment', name: 'Suspended Sediment', fetch: fetchSuspendedSediment, icon: 'layers', color: '#f59e0b' },
  { id: 'temperature', name: 'Temperature', fetch: fetchTemperature, icon: 'thermometer', color: '#ef4444' },
  { id: 'relative-humidity', name: 'Relative Humidity', fetch: fetchRelativeHumidity, icon: 'cloud', color: '#64748b' },
  { id: 'wind-direction', name: 'Wind Direction', fetch: fetchWindDirection, icon: 'wind', color: '#14b8a6' },
  { id: 'solar-radiation', name: 'Solar Radiation', fetch: fetchSolarRadiation, icon: 'sun', color: '#f97316' },
  { id: 'soil-moisture', name: 'Soil Moisture', fetch: fetchSoilMoisture, icon: 'mountain', color: '#84cc16' },
  { id: 'snowfall', name: 'Snowfall', fetch: fetchSnowfall, icon: 'snowflake', color: '#a5b4fc' },
  { id: 'evapotranspiration', name: 'Evapo Transpiration', fetch: fetchEvapotranspiration, icon: 'cloud-sun', color: '#fbbf24' },
  { id: 'atmospheric-pressure', name: 'Atmospheric Pressure', fetch: fetchAtmosphericPressure, icon: 'gauge', color: '#78716c' },
];

export default { DATASETS, fetchDataset };
