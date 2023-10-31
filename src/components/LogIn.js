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
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });
  const { logIn } = useContext(AuthContext);

  function SubmitHandler(formData) {
    logIn(formData);
  }

  return (
    <div>
      <form className="signForm" onSubmit={handleSubmit(SubmitHandler)}>
        <h1
          className="sign-h1"
          style={{
            textAlign: "start",
            marginBottom: "0px",
            marginLeft: "20px",
          }}
        >
          Start Exploring
        </h1>
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
                  value: 50,
                  message: "Email address must be maximum 50 characters.",
                },
              })}
            />
          </label>
          {errors.email && <p className="sign-error">{errors.email.message}</p>}
        </div>
        <div className="sign-input">
          <label>
            <input
              className="sign-input"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Please enter your password.",
                minLength: {
                  value: 8,
                  message: "Password must be minimum 8 characters.",
                },
                maxLength: {
                  value: 50,
                  message: "Password must be maximum 50 characters.",
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
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
export default LogIn;
