import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = (username, password) => {
  console.log(baseUrl);
  const res = axios.post(
    `${baseUrl}/auth/login`,
    { username, password },
    { withCredentials: true },
  );
  return res.data;
};
