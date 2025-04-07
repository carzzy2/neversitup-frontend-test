
// API Configuration
export const API_CONFIG = {
  // Set to 'mock' to use mock data, 'real' to use the real API
  MODE: 'mock' as 'mock' | 'real',
  API_BASE_URL: 'https://candidate-assignment.neversitup.com',
  ENABLE_LOGS: false,
};

export const setApiMode = (mode: 'mock' | 'real') => {
  API_CONFIG.MODE = mode;
};
