import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});

  const createUser = (data) => {
    setUser({ ...data });
  };

  return (
    <AuthContext.Provider value={{ user, createUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
