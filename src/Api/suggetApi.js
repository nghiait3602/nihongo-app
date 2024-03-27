import axiosClient from './axiosClient';

class ChuDecApi {
  ChuDeHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/tech/${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const chuDecApi = new ChuDecApi();
export default chuDecApi;
