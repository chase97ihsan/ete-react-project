import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CompanyContext } from "../contexts/CompanyContext";

export default function CompanyUpdate({ id }) {
  const { updateCompany } = useContext(CompanyContext);
  const { allCompanies } = useContext(CompanyContext);
  const getCompany = allCompanies.find((p) => p.id === id) || {};

  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  function SubmitHandler(formData) {
    updateCompany(formData);
    console.log(id);
  }
  useEffect(() => {
    // id değiştiğinde defaultValues objesini güncelleyin
    setValue("id", id);
    setValue("name", getCompany.name);
    setValue("legalNumber", getCompany.legalNumber);
    setValue("country", getCompany.country);
    setValue("website", getCompany.website);
  }, [id]);
  return (
    <>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div>
          <label>
            <input
              className="form-control mb-3 mt-2 "
              style={{ width: "300px" }}
              type="text"
              {...register("name")}
            />
          </label>

          <div>
            <label>
              <input
                className="form-control  mb-3"
                style={{ width: "300px" }}
                type="text"
                {...register("legalNumber")}
              />
            </label>
          </div>
          <div>
            <label>
              <input
                className="form-control mb-3"
                style={{ width: "300px" }}
                type="text"
                {...register("country")}
              />
            </label>
          </div>
          <div>
            <label>
              <input
                className="form-control mb-3"
                style={{ width: "300px" }}
                type="text"
                {...register("website")}
              />
            </label>
          </div>
          <div>
            <button
              className="btn btn-primary p-5 pb-1 pt-1 mb-2"
              data-bs-dismiss="modal"
              type="submit"
              disabled={!isValid}
              style={{ fontSize: "20px" }}
            >
              EDIT
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
