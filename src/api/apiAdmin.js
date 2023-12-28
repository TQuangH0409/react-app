import getData from "./apiData";

const getAllStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getData(`/users/position?position=STUDENT`, {
        headers: {
          token: token
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

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

  const getAllTeacher = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getData(`/users/position?position=TEACHER`, {
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

  const getAllResearchArea = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await getData(`/research-areas`, {
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

  export {getAllStudent , getUserById, getAllResearchArea}