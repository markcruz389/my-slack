import { getAuth } from "../services/localStorage";

export async function handleResponse(response) {
  if (response.status === 200) return response;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.statusText();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

export function createHeaders() {
  const auth = getAuth();
  const headers = {
    client: auth.client,
    expiry: auth.expiry,
    uid: auth.uid,
  };
  headers["access-token"] = auth["access-token"];
  return headers;
}
