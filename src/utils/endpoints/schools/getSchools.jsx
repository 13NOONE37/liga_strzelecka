import fetchData from '../../fetchData';

const getSchools = async () => {
  try {
    const { data, status } = await fetchData({ action: 'getSchools' });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export default getSchools;
