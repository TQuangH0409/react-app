import getData from "./apiData";

const getAllProject = async (current) => {
    try {
      const token = localStorage.getItem("token");
      const response = await getData(`/projects/?size=10&page=${current}`, {
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

//   const getAllTeacher = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await getData(`/users/position?position=TEACHER`, {
//         headers: {
//           token: token
//         }
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error; // Re-throw the error to handle it where the function is called
//     }
//   };

//   const getAllResearchArea = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await getData(`/research-areas`, {
//         headers: {
//           token: token
//         }
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error; // Re-throw the error to handle it where the function is called
//     }
//   };

//   export {getAllProject , getUserById, getAllResearchArea}
  export {getAllProject}
