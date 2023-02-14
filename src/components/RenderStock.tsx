import React, { FC, useContext } from "react";
import { ActionContext } from "../context/action";
import ProductCard from "./ProductCard";

const RenderStock: FC = () => {
  const { allProduct } = useContext(ActionContext);
  return (
    <>
      <div className="grid justify-evenly items-center mt-8">
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-10">
          {allProduct.length > 0 ? (
            allProduct.slice(0).map((pdt) => {
              return (
                <ProductCard
                  productName={pdt.productName}
                  productAmount={pdt.productAmount}
                />
              );
            })
          ) : (
            <div>empty</div>
          )}
        </div>
      </div>
    </>
  );
};

export default RenderStock;
