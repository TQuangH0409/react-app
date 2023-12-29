import axiosData from "./axiosData";

export async function getUserById(id) {
  const userId = localStorage.getItem("userId");
  const res = await axiosData().get(`/users/${id ? id : userId}`);

  return res.data;
}
