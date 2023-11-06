import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CompanyContext } from "../contexts/CompanyContext";

export default function CompanyUpdate({ onClose, id }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: id,
      name: "",
      legalNumber: "",
      country: "",
      website: "",
    },
  });

  const { updateCompany } = useContext(CompanyContext);
  const { allCompanies } = useContext(CompanyContext);
  const getCompany = allCompanies.find((p) => p.id === id);

  function SubmitHandler(formData) {
    updateCompany(formData);
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
            <div>
              <h1 className="sign-h1">Edit company information</h1>
              <div className="sign-input modal-input ">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={getCompany.name}
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
                    placeholder={getCompany.legalNumber}
                    {...register("legalNumber", {
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
                    placeholder={getCompany.country}
                    {...register("country")}
                  />
                </label>
              </div>
              <div className="sign-input modal-input">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={getCompany.website}
                    {...register("website")}
                  />
                </label>
              </div>
              <div>
                <button
                  className="sign-button"
                  type="submit"
                  disabled={!isValid}
                  style={{ fontSize: "20px" }}
                >
                  SAVE
                </button>
              </div>
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
