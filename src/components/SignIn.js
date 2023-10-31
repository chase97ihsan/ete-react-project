import { useContext, useEffect } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { NavLink, Route, Routes } from "react-router-dom";
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
    <div className="AnaSayfa">
      <div className="heading">
        <h1>EXPLORE </h1>
        <h2>COMPANIES AND THEIR PRODUCTS</h2>
      </div>
      <div className="form">
        <form className="signForm" onSubmit={handleSubmit(SubmitHandler)}>
          <i
            className="fa-brands fa-twitter fa-2xl"
            style={{ color: "#2295ec", fontSize: "60px" }}
          ></i>
          <h1 className="sign-h1">Create an acount</h1>
          <div className="sign-input">
            <label>
              <input
                className="sign-input"
                type="text"
                placeholder="Firstname"
                {...register("firstName", {
                  required: "Please enter your firstname.",
                  minLength: {
                    value: 3,
                    message: "Firstname must be minimum 3 characters.",
                  },
                  maxLength: {
                    value: 45,
                    message: "Firstname must be maximum 50 characters.",
                  },
                })}
              />
            </label>
            {errors.firstName && (
              <p className="sign-error">{errors.firstName.message}</p>
            )}
          </div>
          <div className="sign-input">
            <label>
              <input
                className="sign-input"
                type="text"
                placeholder="Lastname"
                {...register("lastName", {
                  required: "Please enter your lastname.",
                  minLength: {
                    value: 3,
                    message: "Lastname must be minimum 3 characters.",
                  },
                  maxLength: {
                    value: 45,
                    message: "Lastname must be maximum 50 characters.",
                  },
                })}
              />
            </label>
            {errors.lastName && (
              <p className="sign-error">{errors.lastName.message}</p>
            )}
          </div>
          <div className="sign-input">
            <label>
              <input
                className="sign-input"
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Please enter you email address.",
                  minLength: {
                    value: 12,
                    message: "Email address must be minimum 12 characters.",
                  },
                  maxLength: {
                    value: 45,
                    message: "Email address must be maximum 50 characters.",
                  },
                })}
              />
            </label>
            {errors.email && (
              <p className="sign-error">{errors.email.message}</p>
            )}
          </div>
          <div className="sign-input">
            <label>
              <input
                className="sign-input"
                type="password"
                placeholder="Password."
                {...register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 8,
                    message: "User password must be minimum 8 characters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "User password must be maximum 50 characters.",
                  },
                })}
              />
            </label>
            {errors.password && (
              <p className="sign-error">{errors.password.message}</p>
            )}
          </div>
          <div>
            <button className="sign-button" type="submit" disabled={!isValid}>
              Sign in
            </button>
          </div>
        </form>
        <div className="h3-tologin">
          <h3 style={{ textAlign: "start" }}>Do you have an account?</h3>
          <NavLink className="to-login" type="button" to="/login">
            {" "}
            <span
              style={{
                paddingTop: "9px",
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              Log in
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
