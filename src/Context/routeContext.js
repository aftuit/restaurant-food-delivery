import React from "react";

const routeContext = React.createContext(null);

const initialState = {
  routePath: "",
  foodData: [],
};

function RouteProvider({ children }) {
  const [route, setRoute] = React.useState(initialState);

  return (
    <routeContext.Provider value={{ route, setRoute }}>
      {children}
    </routeContext.Provider>
  );
}

export {RouteProvider, routeContext};
