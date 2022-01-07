import axios from "axios";

const API_BASE_URL = "https://slackapi.avionschool.com/api/v1";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/users", {
      headers: {
        "access-token": "EyJCCUihCIB2Ai9-doxosg",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (user) => {
  const payload = {
    email: user.email,
    password: user.password,
    password_confirmation: user.confrimPassword,
  };

  try {
    const response = await axios.post(API_BASE_URL + "/auth", payload);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (user) => {
  const payload = {
    email: user.email,
    password: user.password,
  };

  try {
    const response = await axios.post(API_BASE_URL + "/auth/sign_in", payload);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
