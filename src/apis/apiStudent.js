import axiosData from "./axiosData";

export async function getUserById(id) {
  const userId = localStorage.getItem("userId");
  const res = await axiosData().get(`/users/${id ? id : userId}`);

  return res.data;
}

export async function sendAvatar(file) {

  const res = await axiosData().post(`/files/upload-file/`, file);
  return res.data;
}

export async function getAvatar(id) {
  const res = await axiosData().get(`/files/${id}`);
}
