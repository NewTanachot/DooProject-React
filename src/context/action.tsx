import { useState, useEffect, createContext, useContext } from "react";
// Type
import {
  ActionContextInterface,
  ActionProviderInterface,
  newUser,
  ProductInterface,
} from "../types/context/Action.context";

const sampleProduct: ProductInterface[] = [
  {
    productId: "1",
    productName: "Item1",
    productDescription: "Must have!",
    productAmount: 10,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
  {
    productId: "2",
    productName: "Item2",
    productDescription: "Must have!",
    productAmount: 20,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
  {
    productId: "3",
    productName: "Item3",
    productDescription: "Must have!",
    productAmount: 30,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
  {
    productId: "4",
    productName: "Item4",
    productDescription: "Must have!",
    productAmount: 40,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
];

const defaultValue: ActionContextInterface = {
  isLogin: false,
  handleRegister: async (user: newUser) => {},
  handleLogin: async (email: string, password: string) => {},
  allProduct: sampleProduct,
  getAllProduct: async () => {},
  currentIndex: null,
  handleCurrentIndex: (index: number) => {},
  addAmount: async (amount: number) => {},
  reduceAmount: async (amount: number) => {},
  handleIsAdjust: () => {},
  isAdjust: false,
};

export const ActionContext =
  createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [allProduct, setAllProduct] =
    useState<ProductInterface[]>(sampleProduct);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isAdjust, setIsAdjust] = useState<boolean>(false);

  // use in useEffect
  const checkIfIsLogin = (): void => {
    if (localStorage.getItem("userName")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const handleRegister = async (user: newUser) => {
    // delete this line before connect to server
    localStorage.setItem("JWT", JSON.stringify(user));
    try {
      // fetch response to server
    } catch (error) {
      alert(error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const BodyData = {
      email: email,
      password: password,
    };

    try {
      const Response = await fetch("https://localhost:7260/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BodyData),
      });

      const Data = await Response.json();

      // Save UserId and another credential to Localstorage
      // console.log(Data);
      localStorage.setItem("JWT", JSON.stringify(Data));

      setIsLogin(true);
    } catch (error) {
      alert(error);
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await fetch(
        "https://localhost:7260/api/Product/GetProduct",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();

        setAllProduct(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const addAmount = async (amount: number) => {
    // Make a copy of the current product object
    const updatedProduct = allProduct;

    // Update the productAmount property
    updatedProduct[currentIndex || 0].productAmount += Number(amount);

    setAllProduct(updatedProduct);

    // Make a PUT request to update the product on the server
    try {
    } catch (error) {
    } finally {
      setIsAdjust(false);
    }
  };

  const reduceAmount = async (amount: number) => {
    // Make a copy of the current product object
    const updatedProduct = allProduct;

    // Update the productAmount property
    updatedProduct[currentIndex || 0].productAmount -= Number(amount);

    setAllProduct(updatedProduct);

    // Make a PUT request to update the product on the server
    try {
    } catch (error) {
    } finally {
      setIsAdjust(false);
    }
  };

  const handleIsAdjust = () => {
    setIsAdjust(!isAdjust);
  };

  const addNewProduct = (newProduct: ProductInterface) => {
    // change newProduct type to newProductInterface
    // delete after connected to server
    setAllProduct([...allProduct, newProduct]);

    // fetch newProduct to server
    try {
    } catch (error) {}
  };

  return (
    <ActionContext.Provider
      value={{
        isLogin,
        handleRegister,
        handleLogin,
        allProduct,
        getAllProduct,
        currentIndex,
        handleCurrentIndex,
        addAmount,
        reduceAmount,
        handleIsAdjust,
        isAdjust,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
