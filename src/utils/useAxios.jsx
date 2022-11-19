import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addToken, removeToken } from "../tools/AuthSlice";

const baseUrl = "http://127.0.0.1:8000";
const useAxios = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${token?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(token?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    } else {
      const response = await axios.post(`${baseUrl}/api/token/refresh/`, {
        refresh: token?.refresh,
      });
      if (response.status === 200) {
        dispatch(addToken(response.data));
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      } else {
        dispatch(removeToken());
      }
    }
  });

  return axiosInstance;
};

export default useAxios;
