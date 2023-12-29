import {getData, putData, postData} from "./apiData";

const optionYear = [
  {
    value:"20231",
    label:"20231",
  },
  {
    value:"20223",
    label:"20223",
  },
  {
    value:"20222",
    label:"20222",
  },
  {
    value:"20221",
    label:"20221",
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
  try {
    const token = localStorage.getItem("token");
    const response = await getData(`/users/${id}`, {
      headers: {
        token: token
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const updateUserById = async (id, valueUser) => {
  try {
    const token = localStorage.getItem("token");
    const response = await putData(`/users/${id}`, {
      headers: {
        token: token
      },
      body: JSON.stringify(valueUser)
    });
    if (!response.ok) {
      // Xử lý lỗi nếu có
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update user failed');
    }

    // Xử lý thành công nếu cần
    const updatedUserData = await response.json();
    console.log('User updated successfully:', updatedUserData);

    // Trả về dữ liệu sau khi cập nhật (nếu cần)
    return updatedUserData;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

const deleteUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)
    const response = await putData(`/users/${id}`, {
      headers: {
        token: token
      },
      body: JSON.stringify({ is_active: false })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Delete user failed');
    }

    const updatedUserData = await response.json();
    console.log('User delete successfully:', updatedUserData);

    return updatedUserData;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const getAllUserByPosition = async (position) => {
  try {
    const token = localStorage.getItem("token");
    const response = await getData(`/users/position?position=${position}`, {
      headers: {
        token: token
      }
    });


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

      const token = localStorage.getItem("token");
      const response = await getData(`/research-areas/?page=${currentPage}`, {
        headers: {
          token: token
        }
      });
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

const createUser = async (valueUser) => {
  try {
    const token = localStorage.getItem("token");
    const response = await postData(`/users/`, {
      headers: {
        token: token
      },
      body: JSON.stringify(valueUser)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'create user failed');
    }
    const userData = await response.json();
    console.log('User created successfully:', userData);

    return userData;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export { getAllUserByPosition, getUserById, getAllResearchArea, optionYear, optionSchool, updateUserById, createUser, deleteUserById}