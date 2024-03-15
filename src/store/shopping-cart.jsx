import { createContext, useState, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext = createContext({
    items: [],
addItemToCart: () => {},
updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
return state;
}

export default function CartContextProvider({ children}) {
const [ shoppingCartState, shoppingCartDispatch ] = useReducer(shoppingCartReducer, { items: [], });

    const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });
    
      function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
    
        

          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === id);
            updatedItems.push({
              id: id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            items: updatedItems,
          };
        });
      }

      // function handleUpdateCartItemQuantity(id, quantity) {
      //   setShoppingCart((prevShoppingCart) => {
      //     const updatedItems = [...prevShoppingCart.items];
      //     const existingCartItemIndex = updatedItems.findIndex(
      //       (cartItem) => cartItem.id === id
      //     );
      //     if (existingCartItemIndex >= 0) {
      //       const existingCartItem = updatedItems[existingCartItemIndex];
      //       const updatedItem = {
      //         ...existingCartItem,
      //         quantity: quantity, 
      //       };
      //       updatedItems[existingCartItemIndex] = updatedItem;
      //     }
      //     return {
      //       items: updatedItems,
      //     };
      //   });
      // }

    const ctxValue = {
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };
  
    return <CartContext.Provider value={ctxValue}></CartContext.Provider>
}