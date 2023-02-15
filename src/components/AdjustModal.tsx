import React, { useState, useContext, FC } from "react";
import { ActionContext } from "../context/action";

interface Props {
  onClose: () => void;
}

const AdjustModal: FC<Props> = (prop) => {
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
    prop.onClose();
  };

  const checkFormValid = () => {
    // value > 0 && if reduce then value <= produceAmount
  };

  return (
    <>
      <input type="checkbox" id="adjust-modal" className="modal-toggle" />
      <div className="modal" id="adjust-modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">
            {allProduct[currentIndex || 0].productName}
          </h3>
          <div className="flex justify-between items-center mt-4">
            <section>
              <button
                className={`btn border-0 px-10 mx-4 ${
                  addOrReduce === "add" && "bg-white text-black"
                }`}
                onClick={() => {
                  setAddOrReduce("add");
                }}
                disabled={addOrReduce === "add"}
              >
                เพิ่ม
              </button>
              <button
                className={`btn border-0 px-10 mx-4`}
                onClick={() => {
                  setAddOrReduce("reduce");
                }}
                disabled={addOrReduce === "reduce"}
              >
                ลด
              </button>
            </section>
            <label className="font-bold">
              <input
                type="checkbox"
                checked={isAdjust}
                onChange={handleIsAdjust}
              />
              แก้ไข
            </label>
          </div>

          {addOrReduce && (
            <form className="flex flex-col justify-start items-center border-t-2 mt-8 p-4">
              <label className="font-bold text-2xl text-center">
                Enter {addOrReduce} value
              </label>
              <input
                placeholder="Amount (baht):"
                name="amount"
                type="number"
                step={1}
                onChange={inputAmount}
                value={amount}
                className="input input-bordered w-full my-4"
              />

              <div className="flex flex-row mt-10 justify-between items-center">
                <button
                  type="button"
                  className="btn btn-primary mx-8"
                  onClick={closeModalHandler}
                >
                  cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary mx-8"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdjustModal;
