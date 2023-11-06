import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useForm } from "react-hook-form";

export default function ProductAdd({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      companyId: "",
      category: "",
      amount: "",
      amountUnit: "",
    },
  });

  const { createProduct } = useContext(ProductContext);

  function SubmitHandler(formData) {
    createProduct(formData);
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
              <h1 className="sign-h1">Add a new product</h1>
              <div className="sign-input modal-input ">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={"Product name"}
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
                    placeholder={"Company ID"}
                    {...register("companyId", {
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
                    placeholder={"Category"}
                    {...register("category")}
                  />
                </label>
              </div>
              <div className="sign-input modal-input">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={"Amount"}
                    {...register("amount")}
                  />
                </label>
              </div>
              <div className="sign-input modal-input">
                <label>
                  <input
                    className="sign-input"
                    type="text"
                    placeholder={"Amount Unit"}
                    {...register("amountUnit")}
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
