import axios from "axios";
import { API_BASE_URL } from "./constants";
import * as apiUtils from "./apiUtils";

// Channels

export const send = async (request) => {
  const _headers = apiUtils.createHeaders();
  const payload = {
    receiver_id: request.receiverId,
    receiver_class: request.receiverClass,
    body: request.body,
  };
  debugger;
  try {
    const response = await axios.post(API_BASE_URL + "/messages", payload, {
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

export const retrieveMessages = async (params) => {
  const _headers = apiUtils.createHeaders();
  const _params = new URLSearchParams([
    ["receiver_id", params.receiverId],
    ["receiver_class", params.receiverClass],
  ]);

  try {
    const response = await axios.get(
      API_BASE_URL +
        `/messages?receiver_id=${params.receiverId}&receiver_class=${params.receiverClass}`,
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
