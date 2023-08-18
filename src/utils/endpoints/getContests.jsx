import fetchData from '../fetchData';

const getContests = async () => {
  try {
    const { data, status } = await fetchData({ action: 'getContests' });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export default getContests;
