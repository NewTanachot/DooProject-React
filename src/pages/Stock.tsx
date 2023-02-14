import React, { useState, useEffect } from "react";
import { RenderStock, Loader } from "../components";

import { ProductInterface } from "../types/ProductType";

const dumbItems = [
  { productName: "Pen" },
  { productName: "Bolt" },
  { productName: "Gear" },
];

const Stock = () => {
  const [allProducts, setAllProducts] = useState<ProductInterface[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllStock = async () => {
      setLoading(true);
      try {
        const response = await fetch("url", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          setAllProducts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    setAllProducts(dumbItems);

    // fetchAllStock();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            {allProducts ? (
              <RenderStock product={allProducts} />
            ) : (
              <div>Empty</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Stock;
