import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useForm } from "react-hook-form";

export default function ProductUpdate({ onClose, id, companyId }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: id,
      companyId: companyId,
      name: "",
      category: "",
      amount: "",
      amountUnit: "",
    },
  });
  const { allProducts } = useContext(ProductContext);
  const getProducT = allProducts.find((p) => p.id === id);

  const { updateProduct } = useContext(ProductContext);

  function SubmitHandler(formData) {
    updateProduct(formData);
    onClose();
  }

  const toggleModal = () => {
    onClose();
  };

  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <form onSubmit={handleSubmit(SubmitHandler)}>
            <h1 className="sign-h1">Edit product information</h1>
            <div className="sign-input modal-input">
              <label>
                <input
                  className="sign-input"
                  type="text"
                  placeholder={getProducT.name}
                  {...register("name", {
                    required: "Please enter your password.",
                  })}
                />
              </label>
            </div>
            <div className="sign-input modal-input">
              <label>
                <input
                  className="sign-input"
                  type="text"
                  placeholder={getProducT.category}
                  {...register("category", {
                    required: "Please enter your password.",
                  })}
                />
              </label>
            </div>
            <div className="sign-input modal-input">
              <label>
                <input
                  className="sign-input"
                  type="text"
                  placeholder={getProducT.amount}
                  {...register("amount")}
                />
              </label>
            </div>
            <div className="sign-input modal-input">
              <label>
                <input
                  className="sign-input"
                  type="text"
                  placeholder={getProducT.amountUnit}
                  {...register("amountUnit")}
                />
              </label>
            </div>
            <div>
              <button
                className="sign-button"
                style={{ fontSize: "20px" }}
                type="submit"
                disabled={!isValid}
              >
                SAVE
              </button>
            </div>
          </form>
          <button className="close-modal" onClick={toggleModal}>
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}
