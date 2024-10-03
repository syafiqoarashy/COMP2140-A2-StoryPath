import axios from 'axios';

const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ4Mjk5MzgifQ.esXpKV6ZMnyUD_U-uBPS9Rh1GDGeWcsvb2uF5XI9onA';
const USERNAME = 's4829938';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JWT_TOKEN}`
  }
});

async function apiRequest(endpoint, method = 'GET', body = null) {
  const config = {
    method,
    url: endpoint,
  };

  if (method === 'POST' || method === 'PATCH') {
    config.headers = {
      ...config.headers,
      'Prefer': 'return=representation'
    };
  }

  if (body) {
    config.data = { ...body, username: USERNAME };
  }

  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function createProject(project) {
  return apiRequest('/project', 'POST', project);
}

export async function getProjects() {
  return apiRequest('/project');
}

export async function getProject(id) {
  return apiRequest(`/project?id=eq.${id}`);
}

export async function updateProject(id, project) {
  return apiRequest(`/project?id=eq.${id}`, 'PATCH', project);
}

export async function deleteProject(id) {
  return apiRequest(`/project?id=eq.${id}`, 'DELETE');
}

export async function getLocations() {
  return apiRequest('/location');
}

export async function getLocation(id) {
  try {
    const result = await apiRequest(`/location?id=eq.${id}`);
    if (result.length === 0) {
      console.log(`No location found with id ${id}`);
    }
    return result;
  } catch (error) {
    console.error(`Error fetching location with id ${id}:`, error);
    throw error;
  }
}

export function getLocationsByProjectId(locations, projectId) {
  return locations.filter(location => location.project_id === projectId);
}

export async function createLocation(location) {
  return apiRequest('/location', 'POST', location);
}

export async function updateLocation(id, location) {
  return apiRequest(`/location?id=eq.${id}`, 'PATCH', location);
}

export async function deleteLocation(id) {
  return apiRequest(`/location?id=eq.${id}`, 'DELETE');
}