import { useFormik } from "formik";
import { formSubmit } from "../../Utils/form-submit";

export function UserForm(props) {
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
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
        values.password
      )
    ) {
      errors.password =
        "Password must contain one number, once special character, one capital and one lowercase letter";
    }

    if (!values.password2) {
      errors.password2 = "Required";
    } else if (values.password2 !== values.password) {
      errors.password2 = "Passwords must match.";
    }
    return errors;
  }

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik(
    {
      initialValues: {
        username: "",
        password: "",
        password2: "",
        role: "admin",
      },
      validate,
      onSubmit: async (values) => {
        await formSubmit("admin_create_user", values);
        props.onExit();
      },
    }
  );

  return (
    <form
      onSubmit={handleSubmit}
      name="create_user"
      className="d-flex flex-column align-items-center"
    >
      <h2 className="pt-5 text-center">Create New User</h2>
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
      <div className="mb-3 px-5">
        <label htmlFor="password2" className="form-label fs-6">
          Confirm Password:
        </label>
        <input
          type="password"
          name="password2"
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control"
        />

        {touched.password2 && errors.password2 ? (
          <div>{errors.password2}</div>
        ) : null}
      </div>

      <div className="mb-3 px-5">
        <label htmlFor="role" className="form-label fs-6">
          Role:
        </label>
        <select
          name="role"
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-select"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <button type="submit">submit</button>
      <button className="mt-2" onClick={() => props.onExit()}>
        Cancel
      </button>
    </form>
  );
}
