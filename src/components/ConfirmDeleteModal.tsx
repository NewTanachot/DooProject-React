import { useContext } from "react";
import { ActionContext } from "../context/action";

const ConfirmDeleteModal = () => {
  const { removeProduct } = useContext(ActionContext);

  const closeModalHandler = (): void => {
    let element = document.getElementById("confirm-modal") as HTMLInputElement;
    element.checked = false;
  };

  const closeAdjustModalHandler = (): void => {
    let element = document.getElementById("adjust-modal") as HTMLInputElement;
    element.checked = false;
  };

  const handleSubmit = (): void => {
    removeProduct();
    closeModalHandler();
    closeAdjustModalHandler();
  };

  return (
    <>
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal" id="confirm-modal">
        <div className="modal-box">
          <label className="flex justify-center items-center text-2xl font-bold">
            ต้องการลบสินค้า<span className="ml-2 text-red-700">หรือไม่</span>
          </label>
          <form className="flex flex-col justify-start items-center border-t-2 mt-8 p-4">
            <div className="flex flex-row mt-10 justify-between items-center">
              <button
                type="button"
                className="btn btn-primary mx-8"
                onClick={closeModalHandler}
              >
                Cancel
              </button>

              <button type="button" className="btn mx-8" onClick={handleSubmit}>
                YES!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
