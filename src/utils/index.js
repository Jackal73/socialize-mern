import axios from "axios";
const API_URL = "http://localhost:8800";
export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});
export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    // if (err?.message === "Authentication failed") {
    //   localStorage.removeItem("user");
    //   window.alert("User session expired. Login again.");
    //   window.location.reload("/login");
    // }
    return { status: err.success, message: err.message };
  }
};

