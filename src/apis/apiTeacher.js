import axiosData from "./axiosData";

const getAllProject = async (teacherId) => {
  try {
    const response = await axiosData().get(
      `/assignments/?teacher=${teacherId}&type=INSTRUCT`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllProjectReview = async (teacherId) => {
  try {
    const response = await axiosData().get(
      `/assignments/?teacher=${teacherId}&type=REVIEW`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTeacherById = async () => {
  console.log(123);
  try {
    const response = await axiosData().get(
      `/users/${localStorage.getItem("userId")}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const getInfoProjectByStudentId = async (student_id) => {
  try {
    const response = await axiosData().get(`/projects/student/${student_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const postProject = async (data) => {
  try {
    const response = await axiosData().post(`/projects`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const putProject = async (data, id) => {
  try {
    const response = await axiosData().put(`/projects/${id}`, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const postFile = async (file) => {
  try {
    const response = await axiosData().post(`/files/upload-file/`, file);
    return response;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const putInfoTeacher = async (id, data) => {
  try {
    const response = await axiosData().put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const getInfoProject = async (idProject) => {
  try {
    console.log(idProject);
    const response = await axiosData().get(`/projects/${idProject}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const downFileReport = async (idReport) => {
  try {
    const response = await axiosData().get(`/files/${idReport}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
}

//   export {getAllProject , getUserById, getAllResearchArea}
export {
  getAllProject,
  getTeacherById,
  getInfoProjectByStudentId,
  getInfoProject,
  getAllProjectReview,
  postProject,
  putProject,
  postFile,
  putInfoTeacher,
  downFileReport
};
