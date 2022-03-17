import React from "react";

const Context = React.createContext();

function useToken(isUpdate) {
  const ctx = React.useContext(Context);
  return isUpdate ? [ctx.setToken] : [ctx.token, ctx.setToken];
}

function LoginProvider({ children }) {
  const [token, setToken] = React.useState(
    JSON.parse(window.localStorage.getItem("token")) ?? false
  );

  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
}

export { useToken, LoginProvider };
