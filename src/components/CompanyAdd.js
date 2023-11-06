import { useContext } from "react";
import { CompanyContext } from "../contexts/CompanyContext";
import { useForm } from "react-hook-form";

export default function CompanyAdd({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      legalNumber: "",
      country: "",
      website: "",
    },
  });

  const { createCompany } = useContext(CompanyContext);

  function SubmitHandler(formData) {
    createCompany(formData);
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
              <h1 className="sign-h1">Add a new company</h1>
              <div className="sign-input modal-input ">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={"Company name"}
                    {...register("name", {
                      required: ".",
                    })}
                  />
                </label>
              </div>
              <div className="sign-input modal-input">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={"Legal number"}
                    {...register("legalNumber", {
                      required: "",
                    })}
                  />
                </label>
              </div>
              <div className="sign-input modal-input">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={"Country"}
                    {...register("country")}
                  />
                </label>
              </div>
              <div className="sign-input modal-input">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={"Website"}
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
