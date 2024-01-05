import axiosData from "./axiosData";

export async function getAss(parmas) {
  let uri = "";
  if (typeof parmas === "object") {
    for (const key in parmas) {
      uri += `${key}=${parmas[key]}&`;
    }
  }
  try {
    const res = await axiosData().get(`/assignments/?${uri}`);
    return res.data;
  } catch (error) {}
  return undefined;
}

export async function getAssInstruct(limit, type, semester) {
  const res = await axiosData().get(
    `/assignments/instruct?limit=${limit}&type=${type}&semester=${semester}`
  );
  return res.data;
}

export async function getAssReview(limit, type, semester) {
  const res = await axiosData().get(
    `/assignments/review?limit=${limit}&type=${type}&semester=${semester}`
  );
  return res.data;
}
