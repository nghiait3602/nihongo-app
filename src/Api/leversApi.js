import axiosClient from './axiosClient';
class LeverAPI {
  HandlerLever = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/capdo${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}
const LerverApi = new LeverAPI();
export default LerverApi;
