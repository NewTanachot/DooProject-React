import React, { FC, useContext, useState, useEffect } from "react";
import { ActionContext } from "../context/action";
import ProductCard from "./ProductCard";
import AdjustModal from "./AdjustModal";

const RenderStock: FC = () => {
  const { allProduct, handleCurrentIndex, getAllProduct } =
    useContext(ActionContext);

  const openModalHandler = (index: number): void => {
    let element = document.getElementById("adjust-modal") as HTMLInputElement;
    element.checked = true;
    handleCurrentIndex(index);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="max-w-screen-lg mx-auto">
          {allProduct.length > 0 ? (
            allProduct.map((pdt, index) => {
              return (
                <ProductCard
                  onClickModal={openModalHandler}
                  productIndex={index}
                  key={pdt.productId}
                />
              );
            })
          ) : (
            <div>empty</div>
          )}
        </div>
      </div>
      <AdjustModal />
    </>
  );
};

export default RenderStock;
