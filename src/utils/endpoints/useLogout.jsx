import fetchData from '../fetchData';

const useLogout = async (setIsLogged, setUserInfo) => {
  try {
    await fetchData({ action: 'logout' });

    setIsLogged(false);
    setUserInfo(null);
  } catch (error) {
    // console.log(error);
  }
};

export default useLogout;
