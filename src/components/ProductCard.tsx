import React, { FC, useContext, useEffect } from "react";
import { ActionContext } from "../context/action";

interface Props {
  onClickModal: (productIndex: number) => void;
  productIndex: number;
}

const ProductCard: FC<Props> = (props) => {
  const { onClickModal, productIndex } = props;
  const { allProduct } = useContext(ActionContext);

  return (
    <div
      className="card card-compact bg-base-100 shadow-xl border-2 border-black px-2"
      onClick={() => onClickModal(productIndex)}
    >
      {/* causing web page */}
      <figure>
        <img
          src="/src/assets/preview.png"
          alt="product-preview"
          className="w-48 h-48"
        />
      </figure>
      <div className="card-body ">
        <h2 className="font-bold text-2xl text-center">
          {/* Need to link break if produce's name are too long*/}
          {allProduct[productIndex].productName}
        </h2>
        <h2 className="font-semibold text-lg text-end mt-4">
          {allProduct[productIndex].productQuantity}
        </h2>
      </div>
    </div>
  );
};

export default ProductCard;
