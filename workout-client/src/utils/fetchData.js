export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status}`);
      return []; // fallback: return empty array
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data || []; // fallback if data is undefined
    }

    return []; // fallback if not JSON

  } catch (error) {
    console.error('❌ Fetch error:', error.message);
    return []; // always fallback to empty array
  }
};
