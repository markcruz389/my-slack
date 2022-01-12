import axios from "axios";
import { API_BASE_URL } from "./constants";
import * as apiUtils from "./apiUtils";

// Users

export const getUsers = async () => {
  const _headers = apiUtils.createHeaders();

  try {
    const response = await axios.get(API_BASE_URL + "/users", {
      headers: _headers,
    });
    return apiUtils.handleResponse(response);
  } catch (error) {
    debugger;
    apiUtils.handleError(error);
    console.error(error);
  }
};

export const saveUser = async (user) => {
  const payload = {
    email: user.email,
    password: user.password,
    password_confirmation: user.confrimPassword,
  };

  try {
    const response = await axios.post(API_BASE_URL + "/auth", payload);
    apiUtils.handleResponse(response);
    console.log(response);
  } catch (error) {
    apiUtils.handleResponse(error);
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
    apiUtils.handleResponse(response);
    console.log(response);
    return response;
  } catch (error) {
    apiUtils.handleResponse(error);
    console.error(error);
  }
};
