import React, { FC, useContext, useEffect } from "react";
import { ActionContext } from "../context/action";

interface Props {
  onClickModal: (productIndex: number) => void;
  productIndex: number;
}

const ProductCard: FC<Props> = ({ onClickModal, productIndex }) => {
  const { allProduct } = useContext(ActionContext);
  const item = allProduct[productIndex];

  return (
    <div
      onClick={() => onClickModal(productIndex)}
      className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl overflow-hidden"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-32 w-32 object-cover"
            src="/src/assets/preview.png"
            alt={item.productName}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {item.productName}
          </div>
          <p className="mt-2 text-gray-500">{item.productDescription}</p>
          <p className="mt-2 text-gray-500">Quantity: {item.productQuantity}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
