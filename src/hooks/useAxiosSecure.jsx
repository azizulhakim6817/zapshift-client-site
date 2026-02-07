import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://zap-shift-server-site-eight.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    //! request-------
    const interceptorRequest = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
    );

    //! response--------
    const intercepterRespons = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptorRequest);
      axiosSecure.interceptors.request.eject(intercepterRespons);
    };
  }, [user?.accessToken, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
