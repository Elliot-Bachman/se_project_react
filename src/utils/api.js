const baseUrl = "http://localhost:3001";

function checkRes(response) {
  if (!response.ok) {
    return Promise.reject(`Error: ${response.status}`);
  }
  return response.json();
}

function getItems(weatherType) {
  const query = weatherType ? `?weather_like=${weatherType}` : "";
  return fetch(`${baseUrl}/items${query}`).then(checkRes);
}

function postItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(checkRes);
}

function deleteItem(itemId) {
  console.log(`Deleting item with _id: ${itemId}`); // Debug log
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(checkRes);
}

export { getItems, deleteItem, postItem };
