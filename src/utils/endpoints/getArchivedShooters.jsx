import fetchData from '../fetchData';

const getArchivedShooters = async () => {
  try {
    const { data, status } = await fetchData({ action: 'getArchivedShooters' });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export default getArchivedShooters;
