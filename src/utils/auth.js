const BASE_URL = "http://localhost:3001"; // Replace with your backend URL if different

// Function to handle user registration
export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return res
          .json()
          .then((data) => Promise.reject(data.message || "Signup failed"));
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error in signup:", error);
      throw error; // Rethrow error for the calling function to handle
    });
};

// Function to handle user login
export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return res
          .json()
          .then((data) => Promise.reject(data.message || "Signin failed"));
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error in signin:", error);
      throw error; // Rethrow error for the calling function to handle
    });
};

// Function to validate token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error validating token:", error);
      throw error;
    });
};
