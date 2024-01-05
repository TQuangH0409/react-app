import axiosData from "./axiosData";

export async function getProjectByStudent(id) {
  const userId = localStorage.getItem("userId");
  try {
    const res = await axiosData().get(`/projects/student/${id ? id : userId}`);
    return res.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: apiProject.js:8 ~ getProjectByStudent ~ error:",
      error
    );
  }
  return undefined;
}
export async function getProjectById(id) {
  try {
    const res = await axiosData().get(`/projects/${id}`);
    return res.data;
  } catch (error) {
    console.log("🚀 ~ file: apiProject.js:21 ~ getProjectById ~ error:", error);
  }
  return {};
}
