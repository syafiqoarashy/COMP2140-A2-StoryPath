const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ4Mjk5MzgifQ.esXpKV6ZMnyUD_U-uBPS9Rh1GDGeWcsvb2uF5XI9onA';
const USERNAME = 's4829938';

async function apiRequest(endpoint, method = 'GET', body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`,
      },
        credentials: 'include',
    };

    if (method === 'POST' || method === 'PATCH') {
      options.headers['Prefer'] = 'return=representation';
    }

    if (body) {
      options.body = JSON.stringify({ ...body, username: USERNAME });
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Raw API response:', result);

    return result;
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

  export async function createLocation(location) {
    return apiRequest('/location', 'POST', location);
  }

  export async function getLocations() {
    return apiRequest('/location');
  }

  export async function getLocation(id) {
    return apiRequest(`/location?id=eq.${id}`);
  }

  export async function updateLocation(id, location) {
    return apiRequest(`/location?id=eq.${id}`, 'PATCH', location);
  }

  export async function deleteLocation(id) {
    return apiRequest(`/location?id=eq.${id}`, 'DELETE');
  }

  export async function getLocationsByProject(projectId) {
    return apiRequest(`/location?project_id=eq.${projectId}`);
  }

  export async function generateQRCode(locationId) {
    // Placeholder
    console.log(`Generate QR code for location ${locationId}`);
  }