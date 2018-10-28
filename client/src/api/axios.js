import axiosInstance from "axios";

import { BASE_URL } from "../constants";

const axios = axiosInstance.create({
  baseURL: `${BASE_URL}`
});

export default axios;
