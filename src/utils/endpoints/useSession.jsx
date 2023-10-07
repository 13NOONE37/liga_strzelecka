import { useEffect } from 'react';
import fetchData from '../fetchData';

const useSession = (setIsLogged, setUserInfo) => {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, status } = await fetchData({ action: 'checkSession' });

        if (status === 200) {
          setIsLogged(true);
          setUserInfo(data.data);
        }
      } catch (error) {
        setIsLogged(false);
        setUserInfo(null);

        // console.log(error);
      }
    };
    checkSession();
  }, []);
};

export default useSession;
