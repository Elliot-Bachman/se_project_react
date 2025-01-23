import { createContext } from "react";

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {}, // Default to a no-op function
});
