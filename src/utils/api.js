const API_BASE_URL = "https://backend-toko-three.vercel.app";

const api = {
  getItems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getItemById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },
};

export default api;
