import { useFormik } from "formik";
import { formSubmit } from "../../Utils/form-submit";

export function UserEditForm(props) {
  function validate(values) {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^([0-9]|[a-z]|[A-Z]|[ \-_]){1,40}$/.test(values.username)) {
      errors.username =
        "Please enter a username containing only letters, numbers and special characters (- or _)";
    }

    return errors;
  }

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik(
    {
      initialValues: {
        username: "Test",
      },
      validate,
      enableReinitialize: true,
      onSubmit: async (values) => {
        await formSubmit("admin_edit_user", {...values, oldUsername: props.username});
        props.onExit();
      },
    }
  );
  return (
    <form
      onSubmit={handleSubmit}
      name="edit_user"
      className="d-flex flex-column align-items-center"
    >
      <h2 className="pt-5 text-center">Edit User</h2>
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
          placeholder={props.username}
        />
        {touched.username && errors.username ? (
          <div>{errors.username}</div>
        ) : null}
      </div>

      <button type="submit">submit</button>
      <button className="mt-2" onClick={() => props.onExit()}>Cancel</button>
    </form>
  );
}
