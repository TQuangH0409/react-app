import axiosData from "./axiosData";

export async function getProjectByStudent(id) {
  const userId = localStorage.getItem("userId");
    const res = await axiosData().get(`/projects/student/${id ? id : userId}`);
    return res.data;
}
export async function getProjectById(id) {
    const res = await axiosData().get(`/projects/${id}`);
    return res.data;
}

export async function updateProject(id, body) {
  const res = await axiosData().put(`/projects/${id}`, body);
  return res.data;
}
