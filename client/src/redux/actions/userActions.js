import axios from "axios";
import { message } from "antd";

// Define the API base URL using the environment variable
const apiUrl = process.env.REACT_APP_API_URL;

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(`${apiUrl}/api/users/login`, reqObj);
    const { admin, username, _id } = response.data;
    localStorage.setItem("user", JSON.stringify({ admin, username, _id }));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(`${apiUrl}/api/users/register`, reqObj);
    message.success("Registration successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};