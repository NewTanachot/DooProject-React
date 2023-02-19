import React, { useState, useContext, FC, useEffect } from "react";
import { ActionContext } from "../context/action";
import { editQuantity } from "../types/context/Action.context";

const updateTypes = ["add", "reduce"];

const AdjustModal: FC = () => {
  const { currentIndex, allProduct, isAdjust, handleIsAdjust, updateQuantity } =
    useContext(ActionContext);
  const [amount, setAmount] = useState<number>(0);
  const [updateType, setUpdateType] = useState<string>("add");

  const [formValid, setFormValid] = useState<boolean>(false);

  const inputAmount = (event: any): void => {
    if (updateType === "add") {
      setAmount(event.target.value);
    } else {
      setAmount(event.target.value);
    }
  };

  const handleSubmit = (): void => {
    const updateData: editQuantity = {
      productId: allProduct[currentIndex].productId,
      quantity: amount,
      transectionType: updateType,
    };

    updateQuantity(updateData);

    closeModalHandler();
  };

  const clearInput = (): void => {
    setUpdateType("add");
    setAmount(0);
  };

  const closeModalHandler = (): void => {
    let element = document.getElementById("adjust-modal") as HTMLInputElement;
    element.checked = false;
    clearInput();
  };

  const checkFormValid = () => {
    if (updateType === "add") {
      return amount > 0;
    } else {
      return amount < 0 && amount <= allProduct[currentIndex].productQuantity;
    }
  };

  useEffect(() => {
    setFormValid(checkFormValid());
  }, [amount, updateType]);

  return (
    <>
      <input type="checkbox" id="adjust-modal" className="modal-toggle" />
      <div className="modal" id="adjust-modal">
        <div className="modal-box">
          <section className="flex justify-between items-center">
            <div className="flex hover:cursor-pointer">
              <h3 className="font-bold text-2xl mx-2">
                {allProduct[0] && allProduct[currentIndex].productName}
              </h3>
              <img
                src="/src/assets/icon_edit.svg"
                alt="edit-icon"
                className="w-6"
              />
            </div>

            <figure>
              <img
                src="/src/assets/icon_bin.svg"
                alt="bin-icon"
                className="w-8"
              />
            </figure>
          </section>

          {/* Adjust section */}
          <div className="flex justify-between items-center mt-6">
            <section>
              <button
                className={`btn border-0 px-10 mx-4 `}
                onClick={() => {
                  setUpdateType(updateTypes[0]);
                }}
                disabled={updateType === "add"}
              >
                เพิ่ม
              </button>
              <button
                className={`btn border-0 px-10 mx-4 `}
                onClick={() => {
                  setUpdateType(updateTypes[1]);
                }}
                disabled={updateType === "reduce"}
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

          <form className="flex flex-col justify-start items-center border-t-2 mt-8 p-4">
            <label className="font-bold text-2xl text-center">
              Enter {updateType} value
            </label>
            <input
              placeholder="0"
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
                disabled={!formValid}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdjustModal;
