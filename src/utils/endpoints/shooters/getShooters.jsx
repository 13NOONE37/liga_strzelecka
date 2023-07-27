import fetchData from '../../fetchData';

const getShooters = async () => {
  try {
    const { data, status } = await fetchData({ action: 'getShooters' });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export default getShooters;
