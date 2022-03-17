import React from "react";

const foodsContext = React.createContext(null);

function useFood(isDouble) {
  const ctx = React.useContext(foodsContext);
  return isDouble ? [ctx.setFoodDatas] : [ctx.foodDatas, ctx.setFoodDatas];
}

function FoodsProvider({ children }) {
  const [foodDatas, setFoodDatas] = React.useState(null);

  React.useEffect(() => {
    
  }, [foodDatas])

  return (
    <foodsContext.Provider value={{ foodDatas, setFoodDatas }}>
      {children}
    </foodsContext.Provider>
  );
}

export { FoodsProvider, useFood };
