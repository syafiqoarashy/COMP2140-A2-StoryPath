import axios from 'axios';

const API_BASE_URL= "https://0b5ff8b0.uqcloud.net/api"
const JWT_TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ4Mjk5MzgifQ.esXpKV6ZMnyUD_U-uBPS9Rh1GDGeWcsvb2uF5XI9onA"
const USERNAME= "s4829938"

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JWT_TOKEN}`
  }
});

/**
 * Makes an API request to the specified endpoint.
 * @param {string} endpoint - The API endpoint to request.
 * @param {string} [method='GET'] - The HTTP method to use for the request.
 * @param {object|null} [body=null] - The request body, if applicable.
 * @returns {Promise<object>} The response data from the API.
 * @throws {Error} Throws an error if the API request fails with a user-friendly message.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const config = {
    method,
    url: endpoint,
  };

  // Add headers for POST and PATCH requests
  if (method === 'POST' || method === 'PATCH') {
    config.headers = {
      ...config.headers,
      'Prefer': 'return=representation'
    };
  }

  // Include the username in the request body if provided
  if (body) {
    config.data = { ...body, username: USERNAME };
  }

  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again later.';
    throw new Error(errorMessage);
  }
}

/**
 * Creates a new project.
 * @param {object} project - The project data to create.
 * @returns {Promise<object>} The created project data.
 */
export async function createProject(project) {
  return apiRequest('/project', 'POST', project);
}

/**
 * Retrieves all projects.
 * @returns {Promise<object[]>} An array of project data.
 */
export async function getProjects() {
  return apiRequest('/project');
}

/**
 * Retrieves a specific project by ID.
 * @param {string} id - The ID of the project to retrieve.
 * @returns {Promise<object>} The project data.
 */
export async function getProject(id) {
  return apiRequest(`/project?id=eq.${id}`);
}

/**
 * Updates a specific project by ID.
 * @param {string} id - The ID of the project to update.
 * @param {object} project - The updated project data.
 * @returns {Promise<object>} The updated project data.
 */
export async function updateProject(id, project) {
  return apiRequest(`/project?id=eq.${id}`, 'PATCH', project);
}

/**
 * Deletes a specific project by ID.
 * @param {string} id - The ID of the project to delete.
 * @returns {Promise<void>} Resolves when the project is deleted.
 */
export async function deleteProject(id) {
  return apiRequest(`/project?id=eq.${id}`, 'DELETE');
}

/**
 * Retrieves all locations.
 * @returns {Promise<object[]>} An array of location data.
 */
export async function getLocations() {
  return apiRequest('/location');
}

/**
 * Retrieves a specific location by ID.
 * @param {string} id - The ID of the location to retrieve.
 * @returns {Promise<object>} The location data.
 */
export async function getLocation(id) {
  return apiRequest(`/location?id=eq.${id}`);
}

/**
 * Filters locations by project ID.
 * @param {object[]} locations - The array of location data.
 * @param {string} projectId - The ID of the project to filter by.
 * @returns {object[]} An array of locations associated with the specified project ID.
 */
export function getLocationsByProjectId(locations, projectId) {
  return locations.filter(location => location.project_id === projectId);
}

/**
 * Creates a new location.
 * @param {object} location - The location data to create.
 * @returns {Promise<object>} The created location data.
 */
export async function createLocation(location) {
  return apiRequest('/location', 'POST', location);
}

/**
 * Updates a specific location by ID.
 * @param {string} id - The ID of the location to update.
 * @param {object} location - The updated location data.
 * @returns {Promise<object>} The updated location data.
 */
export async function updateLocation(id, location) {
  return apiRequest(`/location?id=eq.${id}`, 'PATCH', location);
}

/**
 * Deletes a specific location by ID.
 * @param {string} id - The ID of the location to delete.
 * @returns {Promise<void>} Resolves when the location is deleted.
 */
export async function deleteLocation(id) {
  return apiRequest(`/location?id=eq.${id}`, 'DELETE');
}