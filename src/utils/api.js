// api.js
const API_BASE_URL = "https://backend-tokopedia.vercel.app/api";

const api = {
  getItems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
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
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  getItemsByName: async (name) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?nama_product=${name}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products with name ${name}:`, error);
      throw error;
    }
  },

  getItemsByCategory: async (category) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?category=${category}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(
        `Error fetching products with category ${category}:`,
        error
      );
      throw error;
    }
  },
};

export default api;
