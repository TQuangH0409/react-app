import axiosData from "./axiosData";

export async function login(email, password) {
  const res = await axiosData().post("/auth/login", {
    email: email,
    password: password,
  });

  if (!res) {
    alert("server has error");
  }

  localStorage.setItem("token", res.data.accessToken);
  localStorage.setItem("userId", res.data.id);

}
