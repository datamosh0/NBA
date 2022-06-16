import axios from "axios";

const axiosCall = async (url) => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch();
};

export default axiosCall;
