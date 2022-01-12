import { useFormik } from "formik";
import { formSubmit } from "../../Utils/form-submit";

export function LoginForm(props) {
  function validate(values) {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^([0-9]|[a-z]|[A-Z]|[ \-_]){1,40}$/.test(values.username)) {
      errors.username =
        "Please enter a username containing only letters, numbers and special characters (- or _)";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  }

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik(
    {
      initialValues: {
        username: "",
        password: "",
      },
      validate,
      onSubmit: async (values) => {
        const {ok} = await formSubmit("admin_login", values);
        if(ok){
          props.onSuccess();
        }
      },
    }
  );

  return (
    <form
      onSubmit={handleSubmit}
      name="login"
      className="d-flex flex-column align-items-center"
    >
      <h2 className="pt-5 text-center">Log In</h2>
      <div className="mb-3 px-5">
        <label htmlFor="username" className="form-label fs-6">
          Username:
        </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control"
        />
        {touched.username && errors.username ? (
          <div>{errors.username}</div>
        ) : null}
      </div>

      <div className="mb-3 px-5">
        <label htmlFor="password" className="form-label fs-6">
          Password:
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control"
        />

        {touched.password && errors.password ? (
          <div>{errors.password}</div>
        ) : null}
      </div>

      <button type="submit">submit</button>
    </form>
  );
}
