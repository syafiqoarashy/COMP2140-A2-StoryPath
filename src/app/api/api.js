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