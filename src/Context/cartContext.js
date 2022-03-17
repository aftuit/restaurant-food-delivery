import React from "react";

const CartContext = React.createContext();

function useCartState(isDouble) {
  const ctx = React.useContext(CartContext);

  return isDouble
    ? [ctx.setCartStateList]
    : [ctx.cartStateList, ctx.setCartStateList];
}

function CartProvider({ children }) {
  const [cartStateList, setCartStateList] = React.useState(
    JSON.parse(window.localStorage.getItem("saved__cart__items")) || []
  );

  React.useEffect(() => {
    window.localStorage.setItem("saved__cart__items", JSON.stringify(cartStateList));
  }, [cartStateList])

  return (
    <CartContext.Provider value={{ cartStateList, setCartStateList }}>
      {children}
    </CartContext.Provider>
  );
}

export {CartProvider, useCartState};
