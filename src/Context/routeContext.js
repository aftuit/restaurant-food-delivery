import React from "react";

const routeContext = React.createContext(null);

const initialState = {
  routePath: "",
  foodData: [],
};

function RouteProvider({ children }) {
  const [route, setRoute] = React.useState(
    JSON.parse(window.localStorage.getItem("_route_")) || initialState
  );
  
  React.useEffect(() => {
    window.localStorage.setItem("_route_", JSON.stringify(route));
  }, [route]);

  return (
    <routeContext.Provider value={{ route, setRoute }}>
      {children}
    </routeContext.Provider>
  );
}

export { RouteProvider, routeContext };
