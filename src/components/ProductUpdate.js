import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useForm } from "react-hook-form";

export default function ProductUpdate({ id, companyId }) {
  const { allProducts } = useContext(ProductContext);
  const { updateProduct } = useContext(ProductContext);
  const getProducT = allProducts.find((p) => p.id === id) || {};

  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  function SubmitHandler(formData) {
    updateProduct(formData);
  }

  useEffect(() => {
    // id değiştiğinde defaultValues objesini güncelleyin
    setValue("id", id);
    setValue("companyId", companyId);
    setValue("name", getProducT.name);
    setValue("category", getProducT.category);
    setValue("amount", getProducT.amount);
    setValue("companyName", getProducT.companyName);
  }, [id]);
  return (
    <>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div>
          <label>
            <input
              className="form-control mb-3"
              style={{ width: "300px" }}
              type="text"
              {...register("name")}
            />
          </label>
          <label>
            <input
              className="form-control mb-3 "
              style={{ width: "300px" }}
              type="text"
              {...register("category")}
            />
          </label>
          <label>
            <input
              className="form-control mb-3"
              style={{ width: "300px" }}
              type="text"
              {...register("amount")}
            />
          </label>
          <label>
            <input
              className="form-control mb-3"
              style={{ width: "300px" }}
              type="text"
              readOnly
              {...register("companyName")}
            />
          </label>
        </div>
        <div>
          <button
            className="btn btn-primary p-5 pb-1 pt-1 mb-2"
            data-bs-dismiss="modal"
            style={{ fontSize: "20px" }}
            type="submit"
            disabled={!isValid}
          >
            EDIT
          </button>
        </div>
      </form>
    </>
  );
}
