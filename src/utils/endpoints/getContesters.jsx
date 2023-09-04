import fetchData from '../fetchData';

const getContesters = async (contestId) => {
  try {
    const { data, status } = await fetchData({
      action: 'getContesters',
      contest_id: contestId,
    });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export default getContesters;
