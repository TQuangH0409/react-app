import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://35.213.168.72:8000/api/v1",
  });
  
  const getData = (url, config) => {
    return apiInstance.get(url, config);
  };

  export default getData