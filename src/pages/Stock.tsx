import React, { useState, useEffect, useContext } from "react";
import { RenderStock, Loader, Login, NewProductModal } from "../components";
import { ActionContext } from "../context/action";

const Stock = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <h2 className="font-bold text-4xl">สินค้าที่มีอยู่</h2>
        <label htmlFor="newProduct-modal" className="btn my-4 ml-4 px-8">
          เพิ่มใหม่
        </label>
      </div>
      <NewProductModal />
      <RenderStock />
    </>
  );
};

export default Stock;
