import axiosData from "./axiosData";

export const login = async (email, password) => {
  const res = await axiosData().post("/auth/login", {
    email: email,
    password: password,
  });

  if (!res) {
    alert("server has error");
  }
  localStorage.setItem("token", res.data.accessToken);
  localStorage.setItem("roles", res.data.roles[0]);
  localStorage.setItem("userId", res.data.id);
  localStorage.setItem("fullname", res.data.fullname);

};

export const changePassword = async (oldPassword, newPassword) => {
  const res = await axiosData().post("/auth/update-pasword", {
    old_password: oldPassword,
    new_password: newPassword,
  });
  if (!res) {
    alert("server has error");
  }
  return res.data;
};

export const forgetPassword = async (email) => {
  const res = await axiosData().post("/auth/forgot-password", {
    email: email,
  });
  if (!res) {
    alert("server has error");
  }
  return res.data;
};
