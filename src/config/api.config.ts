export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Helper to get full image URL
  getImageUrl: (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_CONFIG.BASE_URL}${path}`;
  }
};