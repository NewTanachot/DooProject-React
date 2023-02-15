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
      className="card card-compact w-48 h-32 bg-base-100 shadow-xl border-2 border-black"
      onClick={() => onClickModal(productIndex)}
    >
      {/* <figure>
        <img
          src=""
          alt=""
        />
      </figure> */}
      <div className="card-body m-4 ">
        <h2 className="font-bold text-3xl">
          {allProduct[productIndex].productName}
        </h2>
        <h2 className="font-semibold text-lg text-end mt-4">
          {allProduct[productIndex].productAmount}
        </h2>
      </div>
    </div>
  );
};

export default ProductCard;
