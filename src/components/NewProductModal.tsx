import { useState, useContext } from "react";
import { ActionContext } from "../context/action";
import { newProductInterface } from "../types/context/Action.context";
// newProduct types
// productName: string;
// productQuantity: number;
// productDescription: string;
// mfd: string;
// exd: string;

const NewProductModal = () => {
  const { addNewProduct } = useContext(ActionContext);
  // newProduct states
  const [productName, setProductName] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productDescription, setProductDescription] = useState<string>("");
  const [mfd, setMfd] = useState<string>("");
  const [exd, setExd] = useState<string>("");

  const inputProductName = (event: any): void => {
    setProductQuantity(event.target.value);
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
    setProductQuantity(0);
  };

  const closeModalHandler = (): void => {
    let element = document.getElementById(
      "newProduct-modal"
    ) as HTMLInputElement;
    element.checked = false;
    clearInput();
  };

  return (
    <>
      <input type="checkbox" id="newProduct-modal" className="modal-toggle" />
      <div className="modal" id="newProduct-modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">เพิ่มสินค้าใหม่</h3>
          <div className="modal-action">
            <form>
              <label>
                ชื่อสินค้า{" "}
                <span className="font-semibold text-lg text-red-700">*</span>
              </label>
              <input
                placeholder="ชื่อสินค้า"
                name="productName"
                type="string"
                onChange={() => {}}
                value={""}
                className="input input-bordered w-full my-4"
              />

              <label>จำนวนที่นำเข้ามา</label>
              <input
                placeholder="0"
                name="productQuantity"
                type="number"
                onChange={() => {}}
                value={""}
                className="input input-bordered w-full my-4"
              />

              <label>คำอธิบายสินค้า</label>
              <input
                placeholder=""
                name="productDescription"
                type="string"
                onChange={() => {}}
                value={""}
                className="input input-bordered w-full my-4"
              />

              <label>คำอธิบายสินค้า</label>
              <input
                placeholder=""
                name="productDescription"
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
