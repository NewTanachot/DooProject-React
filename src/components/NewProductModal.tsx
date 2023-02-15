import { useState, useContext } from "react";
import { ActionContext } from "../context/action";

const NewProductModal = () => {
  const {
    currentIndex,
    allProduct,
    addAmount,
    reduceAmount,
    isAdjust,
    handleIsAdjust,
  } = useContext(ActionContext);
  const [amount, setAmount] = useState<number>(0);
  const [addOrReduce, setAddOrReduce] = useState<string | null>(null);

  const inputAmount = (event: any): void => {
    setAmount(event.target.value);
  };

  const handleSubmit = (): void => {
    if (addOrReduce === "add") {
      addAmount(amount);
    } else {
      reduceAmount(amount);
    }
    closeModalHandler();
  };

  const clearInput = (): void => {
    setAddOrReduce(null);
    setAmount(0);
  };

  const closeModalHandler = (): void => {
    let element = document.getElementById("adjust-modal") as HTMLInputElement;
    element.checked = false;
    clearInput();
  };

  const checkFormValid = () => {
    // value > 0 && if reduce then value <= produceAmount
  };

  return (
    <>
      <input type="checkbox" id="newProduct-modal" className="modal-toggle" />
      <div className="modal" id="newProduct-modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">เพิ่มสินค้าใหม่</h3>
          <div className="modal-action">
            <form>
              <label>ชื่อสินค้า</label>
              <input
                placeholder="ชื่อสินค้า"
                name="productName"
                type="string"
                onChange={() => {}}
                value={""}
                className="input input-bordered w-full my-4"
              />
            </form>
            <label htmlFor="newProduct-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProductModal;
