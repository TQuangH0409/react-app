
import axiosData from "./axiosData";

const optionYear = [
  {
    value: "20231",
    label: "20231",
  },
  {
    value: "20223",
    label: "20223",
  },
  {
    value: "20222",
    label: "20222",
  },
  {
    value: "20221",
    label: "20221",
  },
];

const optionSchool = [
  {
    value: "Trường Công nghệ Thông tin và Truyền thông",
    label: "Trường Công nghệ Thông tin và Truyền thông",
  },
  {
    value: "Trường Điện - Điện tử",
    label: "Trường Điện - Điện tử",
  },
  {
    value: "Trường Hoá và Khoa học sự sống",
    label: "Trường Hoá và Khoa học sự sống",
  },
  {
    value: "Trường Vật liệu",
    label: "Trường Vật liệu",
  },
  {
    value: "Viện Toán ứng dụng và Tin học",
    label: "Viện Toán ứng dụng và Tin học",
  },
  {
    value: "Viện Vật lý Kỹ thuật",
    label: "Viện Vật lý Kỹ thuật",
  },
  {
    value: "Viện Kinh tế và Quản lý",
    label: "Viện Kinh tế và Quản lý",
  },
  {
    value: "Viện Ngoại ngữ",
    label: "Viện Ngoại ngữ",
  },
  {
    value: "Viện Sư phạm Kỹ thuật",
    label: "Viện Sư phạm Kỹ thuật",
  },

]

const getUserById = async (id) => {
    const response = await axiosData().get(`/users/${id}`);
    console.log('User updated successfully:', response.data);
    return response.data;

};

const updateUserById = async (id, body) => {
  const res = await axiosData().put(`/users/${id}`, body)
    console.log('User updated successfully:', res);
    return res.data;
};

const deleteUserById = async (id,body) => {
    const response = await axiosData().put(`/users/${id}`, body)
    console.log('User delete successfully:', response);

    return response.data;
};

const getAllUserByPosition = async (position) => {
  try {
    const response = await axiosData().get(`/users/position?position=${position}`)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const getAllResearchArea = async () => {
  let currentPage = 0;
  const allData = [];
  while (currentPage < 2) {
    try {
      const response = await axiosData().get(`/research-areas/?page=${currentPage}`)
        
      if (Array.isArray(response.data.data)) {
        const activeResearchAreas = response.data.data.filter(item => item.is_active === true);
        allData.push(...activeResearchAreas);
      }
      currentPage++;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return allData;
};

const createUser = async (body) => {
    const res = await axiosData().post(`/users`, body)
    console.log('User created successfully:', res.data);
    return  res.data;

};

const createResearchArea = async (body) => {
    const res = await axiosData().post(`/research-areas`, body)
    console.log('research area created successfully:', res.data);
    return res.data
}

const deleteResearchArea = async (id) => {
  const res = await axiosData().delete(`/research-areas/${id}`)
  console.log('research area created successfully:', res.data);
  return res.data
}

const updateResearchArea = async (id, body) => {
  const res = await axiosData().put(`/research-areas/${id}`, body)
  console.log('research area created successfully:', res.data);
  return res.data
}

const getResearchAreaById = async (id) => {
  const res = await axiosData().get(`/research-areas/${id}`)
  console.log('research area created successfully:', res.data);
  return res.data
}

const createUserByFile = async (body) => {
  const res = await axiosData().post(`/users/import`,body)
  console.log('research area created successfully:', res.data);
  return res.data
}

const getListAssign = async (semester, type) => {
  const res = await axiosData().get(`/assignments/semester/${semester}?type=${type}`)
  return res.data
}


export { getAllUserByPosition, getUserById, getAllResearchArea, 
  optionYear, optionSchool, updateUserById, 
  createUser, deleteUserById, createResearchArea,
  deleteResearchArea, updateResearchArea, getResearchAreaById,
 createUserByFile, getListAssign}