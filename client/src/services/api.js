// API service for interacting with the Express & MongoDB backend

const API_BASE = '/api';

export const getAdminKey = () => {
  return localStorage.getItem('eportfolio_admin_key') || '';
};

export const setAdminKey = (key) => {
  if (key) {
    localStorage.setItem('eportfolio_admin_key', key);
  } else {
    localStorage.removeItem('eportfolio_admin_key');
  }
};

const getAdminHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-admin-key': getAdminKey()
  };
};

export const verifyAdminPasscode = async (passcode) => {
  const res = await fetch(`${API_BASE}/admin/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: passcode })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Invalid admin passcode');
  }
  return data;
};

export const fetchProfile = async () => {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Profile fetch fallback to default:', err.message);
    return null;
  }
};

export const updateProfile = async (profileData) => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: getAdminHeaders(),
    body: JSON.stringify(profileData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update profile');
  }
  return await res.json();
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Projects fetch fallback:', err.message);
    return [];
  }
};

export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: getAdminHeaders(),
    body: JSON.stringify(projectData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create project');
  }
  return await res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return await res.json();
};

export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Services fetch fallback:', err.message);
    return [];
  }
};

export const fetchToolkit = async () => {
  try {
    const res = await fetch(`${API_BASE}/toolkit`);
    if (!res.ok) throw new Error('Failed to fetch toolkit');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Toolkit fetch fallback:', err.message);
    return [];
  }
};

export const fetchProcesses = async () => {
  try {
    const res = await fetch(`${API_BASE}/processes`);
    if (!res.ok) throw new Error('Failed to fetch processes');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Processes fetch fallback:', err.message);
    return [];
  }
};

export const sendContactMessage = async (messageData) => {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error sending message');
  }
  return data;
};

export const fetchMessages = async () => {
  const res = await fetch(`${API_BASE}/messages`, {
    headers: getAdminHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch messages');
  const json = await res.json();
  return json.data || [];
};

export const deleteMessage = async (id) => {
  const res = await fetch(`${API_BASE}/messages/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete message');
  return await res.json();
};

export const checkHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { status: 'offline', database: 'disconnected' };
    return await res.json();
  } catch {
    return { status: 'offline', database: 'disconnected' };
  }
};
