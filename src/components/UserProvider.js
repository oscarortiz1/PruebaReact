import { createContext, useEffect, useState } from "react";
import { onStateChange } from "../Services/Auth";

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsuscribe = onStateChange((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => unsuscribe;
  }, []);
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};
