import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useForm } from "react-hook-form";

export default function ProductAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      companyId: "",
      category: "",
      amount: "",
      companyName: "",
    },
  });

  const { createProduct } = useContext(ProductContext);

  function SubmitHandler(formData) {
    createProduct(formData);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div>
          <label>
            <input
              className="form-control mt-2 mb-3"
              style={{ width: "300px" }}
              type="text"
              placeholder={"Product name"}
              {...register("name", {
                required: ".",
              })}
            />
          </label>
        </div>

        <label>
          <input
            className="form-control  mb-3"
            style={{ width: "300px" }}
            type="text"
            placeholder={"Company ID"}
            {...register("companyId", {
              required: ".",
            })}
          />
        </label>

        <div>
          <label>
            <input
              className="form-control  mb-3"
              style={{ width: "300px" }}
              type="text"
              placeholder={"Category"}
              {...register("category")}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              className="form-control  mb-3"
              style={{ width: "300px" }}
              type="text"
              placeholder={"Amount"}
              {...register("amount")}
            />
          </label>
        </div>
        <div>
          <button
            className="btn btn-success p-5 pb-1 pt-1 mb-2"
            data-bs-dismiss="modal"
            type="submit"
            disabled={!isValid}
            style={{ fontSize: "20px" }}
          >
            SAVE
          </button>
        </div>
      </form>
    </>
  );
}
