const baseUrl = "http://localhost:3001";

function checkRes(response) {
  if (!response.ok) {
    return Promise.reject(`Error: ${response.status}`);
  }
  return response.json();
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRes);
}

export { getItems };
