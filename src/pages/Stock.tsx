import React, { useState, useEffect, useContext } from "react";
import { RenderStock, Loader, Login, NewProductModal } from "../components";
import { ActionContext } from "../context/action";

const Stock = () => {
  const { isLogin } = useContext(ActionContext);

  return (
    <>
      {isLogin ? (
        <div>
          <section>
            <div className="flex justify-center items-center">
              <h2 className="font-bold text-4xl">สินค้าที่มีอยู่</h2>
              <label htmlFor="newProduct-modal" className="btn my-4 ml-4 px-8">
                เพิ่มใหม่
              </label>
            </div>
            <NewProductModal />
            <RenderStock />
          </section>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Stock;
