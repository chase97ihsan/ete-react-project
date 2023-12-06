import { useContext } from "react";
import { CompanyContext } from "../contexts/CompanyContext";
import { useForm } from "react-hook-form";

export default function CompanyAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
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
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <label>
          <input
            className="form-control mb-3 mt-2 "
            style={{ width: "300px" }}
            type="text"
            placeholder={"Company name"}
            {...register("name", {
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
              placeholder={"Legal number"}
              {...register("legalNumber", {
                required: "",
              })}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              className="form-control  mb-3"
              style={{ width: "300px" }}
              type="text"
              placeholder={"Country"}
              {...register("country")}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              className="form-control  mb-3"
              style={{ width: "300px" }}
              type="text"
              placeholder={"Website"}
              {...register("website")}
            />
          </label>
        </div>
        <div>
          <button
            className="btn btn-success  p-5 pb-1 pt-1 mb-2"
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
