import React, { useState, useEffect, useContext } from "react";
import { RenderStock, Loader, Login } from "../components";
import { ActionContext } from "../context/action";

const Stock = () => {
  const { isLogin } = useContext(ActionContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // getAllProduct();
    setLoading(false);
  }, []);
  return (
    <>
      {!isLogin ? (
        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <RenderStock />
          )}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Stock;
