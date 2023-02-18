import { useState, useContext, useEffect } from "react";
import { ActionContext } from "../context/action";
import { newProductInterface } from "../types/context/Action.context";

const NewProductModal = () => {
  const { addNewProduct } = useContext(ActionContext);
  // newProduct states
  const [productName, setProductName] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productDescription, setProductDescription] = useState<string>("");
  const [mfd, setMfd] = useState<string>("");
  const [exd, setExd] = useState<string>("");

  const [formValid, setFormValid] = useState<boolean>(false);

  const inputProductName = (event: any): void => {
    setProductName(event.target.value);
  };

  const inputProductQuantity = (event: any): void => {
    setProductQuantity(event.target.value);
  };

  const inputProductDescription = (event: any) => {
    setProductDescription(event.target.value);
  };

  const inputMfd = (event: any) => {
    setMfd(event.target.value);
  };

  const inputExd = (event: any) => {
    setExd(event.target.value);
  };

  const handleSubmit = (): void => {
    const data: newProductInterface = {
      productName: productName,
      productQuantity: productQuantity,
      productDescription: productDescription,
      mfd: mfd,
      exd: exd,
    };
    addNewProduct(data);
    closeModalHandler();
  };

  const clearInput = (): void => {
    setProductName("");
    setProductQuantity(0);
    setProductDescription("");
    setMfd("");
    setExd("");
  };

  const closeModalHandler = (): void => {
    let element = document.getElementById(
      "newProduct-modal"
    ) as HTMLInputElement;
    element.checked = false;
    clearInput();
  };

  const checkFormValid = () => {
    setFormValid(productName.length > 0 && productQuantity >= 0);
  };

  useEffect(() => {
    checkFormValid();
  }, [productName, productQuantity, productDescription, mfd, exd]);

  return (
    <>
      <input type="checkbox" id="newProduct-modal" className="modal-toggle" />
      <div className="modal" id="newProduct-modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">เพิ่มสินค้าใหม่</h3>
          <div className="modal-action">
            <form>
              <label htmlFor="product name" className="block font-bold">
                ชื่อสินค้า{" "}
                <span className="font-semibold text-lg text-red-700">*</span>
              </label>
              <input
                placeholder="ชื่อสินค้า"
                name="productName"
                type="string"
                onChange={inputProductName}
                value={productName}
                className="input input-bordered w-full my-4"
              />

              <label htmlFor="product quantity" className="block font-bold">
                จำนวนที่นำเข้ามา
              </label>
              <input
                placeholder="0"
                name="productQuantity"
                type="number"
                onChange={inputProductQuantity}
                value={productQuantity}
                className="input input-bordered w-full my-4"
              />

              <label htmlFor="product description" className="block font-bold">
                คำอธิบายสินค้า
              </label>
              <input
                placeholder="เช่น ยี่ห้อ สีของสินค้า"
                name="productDescription"
                type="string"
                onChange={inputProductDescription}
                value={productDescription}
                className="input input-bordered w-full my-4"
              />

              <section className="flex">
                <div className="w-full mb-2 mr-2">
                  <label htmlFor="mfd" className="block font-bold">
                    วันที่ผลิต
                  </label>
                  <input
                    placeholder="MFD"
                    name="mfd"
                    type="string"
                    onChange={inputMfd}
                    value={mfd}
                    className="input input-bordered w-full my-4"
                  />
                </div>

                <div className="w-full mb-2 ml-2">
                  <label htmlFor="exd" className="block font-bold">
                    วันหมดอายุ
                  </label>
                  <input
                    placeholder="EXD"
                    name="exd"
                    type="string"
                    onChange={inputExd}
                    value={exd}
                    className="input input-bordered w-full my-4"
                  />
                </div>
              </section>

              <div className="flex flex-row mt-4 justify-center items-center">
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
      </div>
    </>
  );
};

export default NewProductModal;
