import { Alert } from "antd";
import axiosData from "./axiosData";

const getAllProject = async (teacherId) => {
  try {
    const response = await axiosData().get(
      `/assignments/?teacher=${teacherId}&type=INSTRUCT`
    );
    return response.data;
  } catch (error) {
    <Alert message="Error" type="error" showIcon />
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

const getTeacherOrStudentById = async (userId) => {
  try {
    const response = await axiosData().get(
      `/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getInfoProjectByStudentId = async (student_id) => {
  try {
    const response = await axiosData().get(`/projects/student/${student_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
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
    <Alert message="Error" type="error" showIcon />
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const postFile = async (file) => {
  try {
    const response = await axiosData().post(`/files/upload-file/`, file);
    return response.data;
  } catch (error) {
    <Alert message="Error" type="error" showIcon />
    throw error;
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
};

const getResearchAreas = async () => {
  try {
    const response = await axiosData().get(`/research-areas/data-source`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

export {
  getAllProject,
  getTeacherOrStudentById,
  getInfoProjectByStudentId,
  getInfoProject,
  getAllProjectReview,
  postProject,
  putProject,
  postFile,
  putInfoTeacher,
  downFileReport,
  getResearchAreas,
};
