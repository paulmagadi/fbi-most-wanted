import axios from 'axios';

export const getMostWanted = async (page = 1, pageSize = 12) => {
  try {
    const response = await axios.get(`https://api.fbi.gov/wanted/v1/list?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch most wanted:', error);
    return { items: [], total: 0 };
  }
};