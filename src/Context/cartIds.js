import React from "react";
import {useCartState} from "./cartContext"
const CartIdsContext = React.createContext();


function CartIdProvider({ children }) {
    const [cartStateList] = useCartState()
  const [cartIdList, setCartIdList] = React.useState([...cartStateList?.map(item => item.id)] || []);

  return (
    <CartIdsContext.Provider value={{ cartIdList, setCartIdList }}>
      {children}
    </CartIdsContext.Provider>
  );
}

export {CartIdProvider, CartIdsContext};
