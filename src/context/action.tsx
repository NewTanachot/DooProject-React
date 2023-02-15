import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Type
import {
  ActionContextInterface,
  ActionProviderInterface,
  newProductInterface,
  newUser,
  ProductInterface,
} from "../types/context/Action.context";

const sampleProduct: ProductInterface[] = [
  {
    productId: "1",
    productName: "Item1",
    productDescription: "Must have!",
    productQuantity: 10,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
  {
    productId: "2",
    productName: "Item2",
    productDescription: "Must have!",
    productQuantity: 20,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
  {
    productId: "3",
    productName: "Item3",
    productDescription: "Must have!",
    productQuantity: 30,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
  {
    productId: "4",
    productName: "Item4",
    productDescription: "Must have!",
    productQuantity: 40,
    mfd: "2023-02-11T16:16:27.643",
    exd: "2023-02-11T16:16:27.643",
    productAddDate: "2023-02-11T23:16:36.9396944",
  },
];

const defaultValue: ActionContextInterface = {
  isLogin: false,
  handleRegister: async (user: newUser) => {},
  currentUser: "",
  handleLogin: async (email: string, password: string) => {},
  handleLogout: () => {},
  allProduct: sampleProduct,
  getAllProduct: async () => {},
  addNewProduct: async (newProduct: newProductInterface) => {},
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
  const [currentUser, setCurrentUser] = useState<string>("User");

  const [allProduct, setAllProduct] =
    useState<ProductInterface[]>(sampleProduct);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isAdjust, setIsAdjust] = useState<boolean>(false);

  // navigation
  // const navigate = useNavigate();

  // use in useEffect
  const checkIfIsLogin = (): void => {
    const user = JSON.parse(localStorage.getItem("JWT") || "");
    if (user.userName != null) {
      setIsLogin(true);
      setCurrentUser(user.userName);
    } else {
      setIsLogin(false);
    }
  };

  const handleRegister = async (user: newUser) => {
    try {
      // fetch response to server
      const response = await fetch("https://localhost:7260/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        await response.json();
        // navigate("/");
      }
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
      const response = await fetch("https://localhost:7260/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BodyData),
      });

      if (response.ok) {
        const Data = await response.json();

        // Save UserId and another credential to Localstorage
        localStorage.setItem("JWT", JSON.stringify(Data));

        const user = JSON.parse(localStorage.getItem("JWT") || "");

        setIsLogin(true);
        setCurrentUser(user.userName);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    setIsLogin(false);
    setCurrentUser("");
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
    // const updatedProduct = allProduct;

    // Update the productAmount property
    // updatedProduct[currentIndex || 0].productQuantity += Number(amount);

    // setAllProduct(updatedProduct);

    let BodyData = {
      productId: allProduct[currentIndex || 0].productId,
      quantity: amount,
      transectionType: "add manual",
    };

    if (isAdjust) {
      BodyData.transectionType = "adjust";
    }

    // Make a PUT request to update the product on the server
    try {
      const response = await fetch(
        "https://localhost:7260/api/Transection/Addsection",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(BodyData),
        }
      );

      if (response.ok) {
        await response.json;
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsAdjust(false);
    }
  };

  const reduceAmount = async (amount: number) => {
    // Make a copy of the current product object
    // const updatedProduct = allProduct;

    // Update the productAmount property
    // updatedProduct[currentIndex || 0].productQuantity -= Number(amount);

    // setAllProduct(updatedProduct);
    let BodyData = {
      productId: allProduct[currentIndex || 0].productId,
      quantity: amount,
      transectionType: "reduce manual",
    };

    if (isAdjust) {
      BodyData.transectionType = "adjust";
    }

    // Make a PUT request to update the product on the server
    try {
      const response = await fetch(
        "https://localhost:7260/api/Transection/Addsection",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(BodyData),
        }
      );

      if (response.ok) {
        await response.json;
      }
    } catch (error) {
    } finally {
      setIsAdjust(false);
    }
  };

  const handleIsAdjust = () => {
    setIsAdjust(!isAdjust);
  };

  const addNewProduct = async (newProduct: newProductInterface) => {
    // change newProduct type to newProductInterface
    // delete after connected to server
    // const newP: ProductInterface = {
    //   productId: (allProduct.length - 1).toString(),
    //   productName: newProduct.productName,
    //   productDescription: newProduct.productDescription,
    //   productQuantity: newProduct.productQuantity,
    //   mfd: newProduct.mfd,
    //   exd: newProduct.exd,
    //   productAddDate: "today",
    // };
    // setAllProduct([...allProduct, newP]);

    // fetch newProduct to server
    try {
      const response = await fetch(
        "https://localhost:7260/api/Transection/Addsection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (response.ok) {
        await response.json;
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    checkIfIsLogin();
  }, []);

  return (
    <ActionContext.Provider
      value={{
        isLogin,
        handleRegister,
        currentUser,
        handleLogin,
        handleLogout,
        allProduct,
        getAllProduct,
        addNewProduct,
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
