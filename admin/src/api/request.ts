import axios from 'axios';

export const request = (config) => {
  const http = axios.create({
    baseURL: '/api/v1',
    // timeout: 5000,
  });

  // 请求拦截
  http.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {}
  );

  // 响应拦截
  http.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (error) => {
      console.log('error===', error.response); // 注意这里必须打印error.response
    }
  );

  return http(config);
};
