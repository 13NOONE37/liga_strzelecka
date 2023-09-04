import fetchData from '../fetchData';

const getTeams = async (contestId) => {
  try {
    const { data, status } = await fetchData({
      action: 'getTeams',
      contest_id: contestId,
    });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export default getTeams;
