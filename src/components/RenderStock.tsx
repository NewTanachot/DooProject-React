import React, { FC, useContext, useState, useEffect } from "react";
import { ActionContext } from "../context/action";
import ProductCard from "./ProductCard";
import AdjustModal from "./AdjustModal";

const RenderStock: FC = () => {
  const { allProduct, handleCurrentIndex } = useContext(ActionContext);
  const [closeModal, setCloseModal] = useState<boolean>(true);

  const openModalHandler = (index: number): void => {
    let element = document.getElementById("adjust-modal") as HTMLInputElement;
    element.checked = true;
    handleCurrentIndex(index);
  };

  const closeModalHandler = (): void => {
    setCloseModal(!closeModal);
  };

  return (
    <>
      <div className="grid justify-evenly items-center mt-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
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
      <AdjustModal onClose={closeModalHandler} />
    </>
  );
};

export default RenderStock;
