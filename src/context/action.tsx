import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Type
import {
  ActionContextInterface,
  ActionProviderInterface,
  newProductInterface,
  newUser,
  ProductInterface,
  editQuantity,
  editProductInterface,
} from "../types/context/Action.context";

const defaultValue: ActionContextInterface = {
  isLogin: false,
  handleRegister: async (user: newUser) => {},
  currentUser: "",

  handleLogin: async (email: string, password: string) => {},
  handleLogout: () => {},
  checkIfIsLogin: () => {},

  allProduct: [],
  getAllProduct: async () => {},
  addNewProduct: async (newProduct: newProductInterface) => {},

  currentIndex: 0,
  handleCurrentIndex: (index: number) => {},

  toggleIsAdjust: () => {},
  updateQuantity: async (updateData: editQuantity) => {},
  isAdjust: false,

  toggleIsEdit: () => {},
  isEdit: false,
  editProduct: async (editedProduct: editProductInterface) => {},

  removeProduct: async () => {},
};

export const ActionContext =
  createContext<ActionContextInterface>(defaultValue);

const transectionTypes = ["add manual", "reduce manual", "adjust"];

export const ActionProvider = ({ children }: ActionProviderInterface) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("User");

  const [allProduct, setAllProduct] = useState<ProductInterface[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAdjust, setIsAdjust] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  // navigation
  // const navigate = useNavigate();

  // use in useEffect
  const checkIfIsLogin = (): void => {
    const localItem = localStorage.getItem("JWT");
    if (localItem) {
      const user = JSON.parse(localItem);
      if (user.userName != null) {
        setIsLogin(true);
        setCurrentUser(user.userName);
        return;
      }
    }

    setIsLogin(false);
  };

  const handleRegister = async (user: newUser) => {
    try {
      // fetch to server
      const response = await fetch("http://localhost:5000/api/Auth/Register", {
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
      const response = await fetch("http://localhost:5000/api/Auth/Login", {
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

  const checkExpire = (exp: string): boolean => {
    const currentDate = new Date();
    const formatExp = new Date(exp);

    return currentDate <= formatExp;
  };

  const getAllProduct = async () => {
    // setLoading(true);
    let token: any = JSON.parse(localStorage.getItem("JWT") || "");

    !checkExpire(token.accessToken_ExpireAt) && handleLogout();

    try {
      // return;
      const response = await fetch(
        "http://localhost:5000/api/Product/GetProduct",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();

        setAllProduct(result.reverse());
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleIsAdjust = () => {
    setIsAdjust(!isAdjust);
  };

  const updateQuantity = async (updateData: editQuantity) => {
    // Make a POST request to update the product on the server
    if (isAdjust) {
      updateData.transectionType += "-adjust";
    }

    setIsSubmit(true);
    let token: any = JSON.parse(localStorage.getItem("JWT") || "");

    try {
      const response = await fetch(
        "http://localhost:5000/api/Transection/AddTransection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        await response.json;
      }
    } catch (error) {
    } finally {
      isAdjust && setIsAdjust(false);
      setIsSubmit(false);
    }
  };

  const addNewProduct = async (newProduct: newProductInterface) => {
    let token: any = JSON.parse(localStorage.getItem("JWT") || "");
    // fetch newProduct to server
    setIsSubmit(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/Product/AddProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (response.ok) {
        await response.json;
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const editProduct = async (editedProduct: editProductInterface) => {
    let token: any = JSON.parse(localStorage.getItem("JWT") || "");
    // fetch editProduct to server
    setIsSubmit(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/Product/EditProduct",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
          body: JSON.stringify(editedProduct),
        }
      );

      if (response.ok) {
        await response.json;
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const removeProduct = async () => {
    let token: any = JSON.parse(localStorage.getItem("JWT") || "");
    // fetch editProduct to server
    setIsSubmit(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/Product/RemoveProduct/${allProduct[currentIndex].productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );

      if (response.ok) {
        await response.json;
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkIfIsLogin();
    };
    init();
  }, [currentUser]);

  useEffect(() => {
    const init = async () => {
      await getAllProduct();
    };
    init();
  }, [isSubmit]);

  return (
    <ActionContext.Provider
      value={{
        isLogin,
        handleRegister,
        currentUser,

        handleLogin,
        handleLogout,
        checkIfIsLogin,

        allProduct,
        getAllProduct,
        addNewProduct,

        currentIndex,
        handleCurrentIndex,
        toggleIsAdjust,
        updateQuantity,
        isAdjust,

        toggleIsEdit,
        isEdit,
        editProduct,

        removeProduct,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
