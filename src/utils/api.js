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

function deleteItem(itemId) {
  console.log(`Deleting item with _id: ${itemId}`); // Debug log
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(checkRes);
}

export { getItems, deleteItem };