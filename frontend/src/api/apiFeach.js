const API_URL = "http://localhost:3001/api/v1";

export async function apiFetch(endpoint, options) {
  const response = await fetch(API_URL + endpoint, {
    headers: {
      "Content-type": "application/json",
    },
    ...options,
  });
  if (response.status === 204) {
    return null;
  }
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    if (Array.isArray(responseData.errors)) {
      throw responseData.errors.reduce(function (acc, error) {
        acc[error.field] = error.message;
        return acc;
      }, {});
    }
    throw responseData;
  }
}

export function formToJson(element) {
  return JSON.stringify(formToObject(element));
}

export function formToObject(element) {
  return Object.fromEntries(new FormData(element));
}
