import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://35.213.168.72:8000/api/v1",
  });
  
  const getData = (url, config) => {
    return apiInstance.get(url, config);
  };

  const putData = (url, config) => {
    return apiInstance.put(url, config)
  }

  const postData = (url, config) => {
    return apiInstance.post(url, config)
  }

  export {getData, putData, postData}