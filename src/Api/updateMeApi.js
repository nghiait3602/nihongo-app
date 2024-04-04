import axiosClient from "./axiosClient";

class ImageAPI {
  async updateUserData(image, token) {
    try {
      const formData = new FormData();
      if (image !== null) {
        formData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "user_photo.jpg",
        });
      }
      const response = await axiosClient.patch(`/api/v1/users/updateMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "", // Truyền token qua header Authorization nếu tồn tại
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export default new ImageAPI();
