import { useContext } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });
  const { logIn } = useContext(AuthContext);

  function SubmitHandler(formData) {
    logIn(formData);
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark ">
      <div
        className="card text-center border-info border-2 bg-dark"
        style={{ marginBottom: "200px", width: "22rem" }}
      >
        <h1 className="card-header fw-bold text-info mb-2">Start Exploring</h1>
        <form
          className="card-body d-flex flex-column gap-2  "
          onSubmit={handleSubmit(SubmitHandler)}
        >
          <div className="container " style={{ height: "64px" }}>
            <label>
              <input
                className="form-control"
                style={{ width: "16rem" }}
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Please enter your email address",
                  minLength: {
                    value: 12,
                    message: "Email must be minimum 12 chars",
                  },
                  maxLength: {
                    value: 50,
                    message: "Email must be maximum 50 characters.",
                  },
                })}
              />
            </label>
            {errors.email && (
              <p className="text-warning text-start mt-0 pt-0  ms-3   ">
                *{errors.email.message}
              </p>
            )}
          </div>
          <div className="container" style={{ height: "60px" }}>
            <label>
              <input
                className="form-control"
                style={{ width: "16rem" }}
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 8,
                    message: "Password must be minimum 8 chars.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be maximum 50 chars.",
                  },
                })}
              />
            </label>
            {errors.password && (
              <p className=" text-warning text-start mt-0 pt-0 ms-3 ">
                *{errors.password.message}
              </p>
            )}
          </div>
          <div className="container ">
            <button
              className="btn btn-info p-5 pb-2 pt-2 rounded-5 text-light fs-5 "
              type="submit"
              disabled={!isValid}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LogIn;
