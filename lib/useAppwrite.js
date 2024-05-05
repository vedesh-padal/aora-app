// writing this as seperate hook because, there is different types of data fetching,
// so, instead of re-writing this whole code, a custom hook is created and 
// what type of fetching should be done is passed as a function  to this hook

import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
    
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response)
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();  // can't use async code directly within useEffect, because would be illegal
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
}

export default useAppwrite;