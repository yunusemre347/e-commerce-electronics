import product from '@/e-commerce-sanity-boosted-free/schemas/product';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';

interface Product {
  //this product is different so it might cause a problem
  _id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

interface ContextValues {
  showCart: boolean;
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>; // Include setShowCart function
  toggleCartItemQuantity: (id: number, value: string) => void; // Include toggleCartItemQuantity function
  onRemove: (id: number, product: Product) => void; // Include toggleCartItemQuantity function
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<ContextValues | undefined>(undefined); //default value "{}""
// if (Context === undefined) {
//   throw Error(
//     'ContextValues must be used inside of ContextValues, ' +
//       'otherwise it will not function correctly.'
//   );
// }

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //let foundProduct:Product;
  let index;

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems: Product[] = cartItems.map((cartProduct) => {
        if (cartProduct._id == product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        else return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };
  const onRemove = (id: number, product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (foundProduct) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
      );
      setCartItems(newCartItems);
    }
  };

  const toggleCartItemQuantity = (id: number, value: string) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    //bunu let değil const yapınca düzeliyor ama çalışıyopr mu bilmiyorum
    const foundProductIndex = cartItems.findIndex(
      (product) => product._id === id
    );

    index = cartItems.findIndex((product) => product._id === id);
    //start from"index" and remove "1" item. we removed because it effects state
    //const newCartItems = cartItems.splice(index, 1);

    // const newCartItems = cartItems.filter((item)=>item._id!==id);

    const newCartItems = [...cartItems];

    if (value === 'inc' && foundProduct) {
      newCartItems[foundProductIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct?.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec' && foundProduct) {
      if (foundProduct?.quantity > 1) {
        newCartItems[foundProductIndex] = {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        };
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct?.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      else return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context); //this will allow to use state like a hook

//to use context in next wrap the whole _app.tsx return in <StateContext>
