import { useContext, useEffect } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });
  const { signIn, token } = useContext(AuthContext);

  function SubmitHandler(formData) {
    signIn(formData);
  }

  return (
    <div>
      <div className="container-fluid sign-bg ">
        <div className="row vh-100">
          <div className="col-7 text-center d-flex justify-content-center">
            <div className="row row-cols-1 d-flex align-items-center">
              <div className="col text-light mt-3 ms-3">
                <h2
                  className=" border border-3 border-info rounded sign-bg "
                  style={{ width: "720px", fontSize: "110px" }}
                >
                  COMPANIES
                </h2>
              </div>
              <div className="col text-dark d-flex justify-content-center">
                {" "}
                <h2 style={{ width: "100px", fontSize: "50px" }}>&&</h2>
              </div>
              <div className="col text-light d-flex justify-content-end mb-5 ms-3 ">
                {" "}
                <h2
                  className=" border border-3 border-info rounded sign-bg-rev "
                  style={{ width: "720px", fontSize: "110px" }}
                >
                  PRODUCTS
                </h2>
              </div>
            </div>
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <div
              className="card text-center border-info border-3 bg-dark me-5 "
              style={{ marginBottom: "40px", width: "29rem" }}
            >
              <h1 className="display-5 fw-bold text-info mb-3 mt-2">
                Create an account
              </h1>
              <form
                className="card-body d-flex flex-column justify-content-center align-items-center "
                onSubmit={handleSubmit(SubmitHandler)}
              >
                <div style={{ height: "64px", width: "17rem" }}>
                  <label>
                    <input
                      className="form-control sign-input-size"
                      type="text"
                      placeholder="Firstname"
                      style={{ width: "17rem" }}
                      {...register("firstName", {
                        required: "Please enter your firstname",
                        minLength: {
                          value: 3,
                          message: "Firstname must be minimum 3 chars",
                        },
                        maxLength: {
                          value: 45,
                          message: "Firstname must be maximum 50 chars",
                        },
                      })}
                    />
                  </label>
                  {errors.firstName && (
                    <p className="text-light text-start mt-0 pt-0">
                      *{errors.firstName.message}
                    </p>
                  )}
                </div>
                <div style={{ height: "64px", width: "17rem" }}>
                  <label>
                    <input
                      className="form-control"
                      style={{ width: "17rem" }}
                      type="text"
                      placeholder="Lastname"
                      {...register("lastName", {
                        required: "Please enter your lastname",
                        minLength: {
                          value: 3,
                          message: "Lastname must be minimum 3 chars",
                        },
                        maxLength: {
                          value: 45,
                          message: "Lastname must be maximum 50 chars",
                        },
                      })}
                    />
                  </label>
                  {errors.lastName && (
                    <p className="text-light text-start mt-0 pt-0 ">
                      *{errors.lastName.message}
                    </p>
                  )}
                </div>
                <div style={{ height: "64px", width: "17rem" }}>
                  <label>
                    <input
                      className="form-control"
                      style={{ width: "17rem" }}
                      type="email"
                      placeholder="Email address"
                      {...register("email", {
                        required: "Please enter you email address",
                        minLength: {
                          value: 12,
                          message: "Email must be minimum 12 chars",
                        },
                        maxLength: {
                          value: 45,
                          message: "Email  must be maximum 50 chars",
                        },
                      })}
                    />
                  </label>
                  {errors.email && (
                    <p className="text-light text-start mt-0 pt-0">
                      *{errors.email.message}
                    </p>
                  )}
                </div>
                <div style={{ height: "64px", width: "17rem" }}>
                  <label>
                    <input
                      className="form-control"
                      style={{ width: "17rem" }}
                      type="password"
                      placeholder="Password."
                      {...register("password", {
                        required: "Please enter your password.",
                        minLength: {
                          value: 8,
                          message: "Password must be minimum 8 chars",
                        },
                        maxLength: {
                          value: 50,
                          message: "Password must be maximum 50 chars",
                        },
                      })}
                    />
                  </label>
                  {errors.password && (
                    <p className="text-light text-start mt-0 pt-0">
                      *{errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    className="btn btn-info p-5 pb-2 pt-2 rounded-4 text-light fs-5"
                    type="submit"
                    disabled={!isValid}
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div
                className="container text-start mt-5"
                style={{ marginLeft: "80px" }}
              >
                <h5 className="text-secondary">Do you have an account?</h5>
                <p>
                  <Link
                    className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-5"
                    type="button"
                    to="/login"
                  >
                    {" "}
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
