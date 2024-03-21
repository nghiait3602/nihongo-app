import axiosClient from "./axiosClient";

class LessionAPI {
  nguPhapHandler = async (url, data, method, token) => {
    try {
      // Kiểm tra xem token có tồn tại không trước khi thêm vào header
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await axiosClient(`/api/v1/nguphap${url}`, {
        method: method ?? "get",
        data,
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
    }
  };
}

const nguPhapApi = new LessionAPI();
export default nguPhapApi;
