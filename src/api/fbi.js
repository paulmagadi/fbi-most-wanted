// import axios from 'axios';

// export const getMostWanted = async (page = 1, pageSize = 12) => {
//   try {
//     const response = await axios.get(`https://api.fbi.gov/wanted/v1/list?page=${page}&pageSize=${pageSize}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch most wanted:', error);
//     return { items: [], total: 0 };
//   }
// };

import axios from 'axios';

export const getMostWanted = async (page = 1) => {
  const res = await axios.get('https://api.fbi.gov/wanted/v1/list', {
    params: { page, pageSize: 12 },
  });
  return res.data;
};

export const getAllMostWanted = async () => {
  let allItems = [];
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const res = await axios.get('https://api.fbi.gov/wanted/v1/list', {
        params: { page, pageSize: 100 },
      });

      const items = res.data.items || [];
      allItems = [...allItems, ...items];
      hasMore = items.length > 0;
      page++;
    }

    return allItems;
  } catch (err) {
    console.error('Error fetching all fugitives:', err);
    return [];
  }
};
