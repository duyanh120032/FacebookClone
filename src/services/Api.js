import axios from "axios";
export const BaseUrl = "http://localhost:8080";

export const axiosClient = axios.create({
  baseURL: BaseUrl,
});
export const axiosClientAuth = (token) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axiosClient;
}

export const axiosPostWithAuth = (data, token) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axiosClient.post(data);
}

