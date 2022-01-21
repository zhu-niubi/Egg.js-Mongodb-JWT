import axios from 'axios';

export const request = (config) => {
  const http = axios.create({
    baseURL: '/api/v1',
    // timeout: 5000,
  });

  // 请求拦截
  http.interceptors.request.use(
    (config) => {
      if (config.method === 'put' || config.method === 'delete') {
        const id = config.data._id || config.data.id;
        config.url = config.url + `/${id}`;
      }
      return config;
    },
    () => {}
  );

  // 响应拦截
  http.interceptors.response.use(
    (res) => {
      console.log('res-------', res);
      return res.data ? res.data : res;
    },
    (error) => {
      console.log('error===', error.response); // 注意这里必须打印error.response
    }
  );

  return http(config);
};
