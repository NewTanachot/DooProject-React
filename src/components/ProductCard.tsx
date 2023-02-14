import React, { FC } from "react";

interface Props {
  productName: string;
  productAmount: number;
}

const ProductCard: FC<Props> = (props) => {
  return (
    <div className="card card-compact w-48 h-32 bg-base-100 shadow-xl">
      {/* <figure>
        <img
          src=""
          alt=""
        />
      </figure> */}
      <div className="card-body m-4 ">
        <h2 className="font-bold text-3xl">{props.productName}</h2>
        <h2 className="font-semibold text-lg text-end mt-4">
          {props.productAmount}
        </h2>
      </div>
    </div>
  );
};

export default ProductCard;
