import { useState, useContext, useEffect } from "react";
import { ActionContext } from "../context/action";
import { editProductInterface } from "../types/context/Action.context";

// "productId": "string",
// "productName": "string",  [If data is "" should set it null]
// "productDescription": "string",  [If data is "" should set it null]
// "mfd": "2023-02-18T15:36:27.331Z",  [If data is "" should set it null]
// "exd": "2023-02-18T15:36:27.331Z"  [If data is "" should set it null]

const EditProductSection = () => {
  const { currentIndex, allProduct, toggleIsEdit, editProduct } =
    useContext(ActionContext);
  const [productName, setProductName] = useState<string>(
    allProduct[currentIndex].productName
  );
  const [productDescription, setProductDescription] = useState<string>(
    allProduct[currentIndex].productDescription || ""
  );
  const [mfd, setMfd] = useState<string>(allProduct[currentIndex].mfd || "");
  const [exd, setExd] = useState<string>(allProduct[currentIndex].exd || "");

  const [formValid, setFormValid] = useState<boolean>(false);

  // INPUT SECTION
  const inputProductName = (event: any): void => {
    setProductName(event.target.value);
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

  // SUBMIT && CANCEL
  const handleSubmit = (): void => {
    const data: editProductInterface = {
      productId: allProduct[currentIndex].productId,
      productName: productName,
      productDescription: productDescription ? productDescription : null,
      mfd: mfd ? new Date(mfd) : null,
      exd: exd ? new Date(exd) : null,
    };

    editProduct(data);
    closeModalHandler();
  };

  const clearInput = (): void => {
    setProductName("");
    setProductDescription("");
    setMfd("");
    setExd("");
  };

  const closeModalHandler = (): void => {
    let element = document.getElementById("adjust-modal") as HTMLInputElement;
    element.checked = false;
    toggleIsEdit();
    clearInput();
  };

  // FORMVALID
  const isDataChange = (): boolean => {
    if (
      allProduct[currentIndex].productName === productName &&
      (allProduct[currentIndex].productDescription || "") ===
        productDescription &&
      (allProduct[currentIndex].mfd || "") === mfd &&
      (allProduct[currentIndex].exd || "") === exd
    )
      return false;

    return true;
  };

  const checkFormValid = () => {
    // formValid
    setFormValid(isDataChange);
  };

  useEffect(() => {
    checkFormValid();
  }, [productName, productDescription, mfd, exd]);
  return (
    <>
      <div className="flex flex-col justify-center items-center text-xl font-bold text-red-700">
        แก้ไข
      </div>

      <form>
        <label htmlFor="product name" className="block font-bold">
          ชื่อสินค้า
        </label>
        <input
          name="productName"
          type="string"
          onChange={inputProductName}
          value={productName}
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
    </>
  );
};

export default EditProductSection;
