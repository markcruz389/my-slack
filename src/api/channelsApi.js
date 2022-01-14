import axios from "axios";
import { API_BASE_URL } from "./constants";
import * as apiUtils from "./apiUtils";

// Channels

export const saveChannel = async (request) => {
  const _headers = apiUtils.createHeaders();
  const payload = {
    name: request.name,
    user_ids: [request.userId1, request.userId2],
  };
  debugger;
  try {
    const response = await axios.post(API_BASE_URL + "/channels", payload, {
      headers: _headers,
    });
    apiUtils.handleResponse(response);
    console.log(response);
    return response;
  } catch (error) {
    apiUtils.handleError(error);
    console.error(error);
  }
};

export const saveMemberInChannel = async (request) => {
  const _headers = apiUtils.createHeaders();
  _headers["Access-Control-Allow-Origin"] = "*";
  const payload = {
    id: request.id,
    member_id: request.memberId,
  };
  debugger;
  try {
    const response = await axios.post(
      API_BASE_URL + "/channel/add_member",
      payload,
      {
        headers: _headers,
      }
    );
    apiUtils.handleResponse(response);
    console.log(response);
    return response;
  } catch (error) {
    apiUtils.handleError(error);
    console.error(error);
  }
};

export const getChannels = async () => {
  const _headers = apiUtils.createHeaders();

  try {
    const response = await axios.get(API_BASE_URL + "/channels", {
      headers: _headers,
    });
    apiUtils.handleResponse(response);
    console.log(response);
    return response;
  } catch (error) {
    apiUtils.handleError(error);
    console.error(error);
  }
};

export const getChannelById = async (id) => {
  const _headers = apiUtils.createHeaders();

  try {
    const response = await axios.get(API_BASE_URL + `/channels/${id}`, {
      headers: _headers,
    });
    apiUtils.handleResponse(response);
    console.log(response);
    return response;
  } catch (error) {
    apiUtils.handleError(error);
    console.error(error);
  }
};
