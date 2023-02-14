import { useState, useEffect, createContext, useContext } from "react";
// Type
import {
  ActionContextInterface,
  ActionProviderInterface,
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
  handleLogin: async (email: string, password: string) => {},
  allProduct: sampleProduct,
  getAllProduct: async () => {},
};

export const ActionContext =
  createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [allProduct, setAllProduct] =
    useState<ProductInterface[]>(sampleProduct);

  // use in useEffect
  const checkIfIsLogin = (): void => {
    if (localStorage.getItem("userName")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
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

  return (
    <ActionContext.Provider
      value={{ isLogin, handleLogin, allProduct, getAllProduct }}
    >
      {children}
    </ActionContext.Provider>
  );
};
