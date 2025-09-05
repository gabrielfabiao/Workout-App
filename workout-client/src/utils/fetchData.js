
export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error || 'Request failed');
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.blob();
    }

  } catch (error) {
    console.error('❌ Fetch error:', error.message);
    throw error;
  }
};
