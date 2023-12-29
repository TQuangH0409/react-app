import axios from "axios";

const axiosData = () => {
  const axiosTemp = axios.create({
    baseURL: `http://35.213.168.72:8000/api/v1`,
  });

  axiosTemp.defaults.headers.common["token"] = localStorage.getItem("token");

  return axiosTemp;
};

export default axiosData;
