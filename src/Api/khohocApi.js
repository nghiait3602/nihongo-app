import axiosClient from './axiosClient';

class KhoaHocApi {
  baiHocHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/khoahoc/${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const KhoaHocAPi = new KhoaHocApi();
export default KhoaHocAPi;
