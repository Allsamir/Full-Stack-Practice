import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";

const UpdateUser = () => {
  const userData = useLoaderData();
  const form = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`http://localhost:3000/user/${userData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          alert("User Updated");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{
        border: "1px solid white",
        margin: "16px",
        padding: "12px",
      }}
    >
      <p>
        Hi <span style={{ fontWeight: "bold" }}>{userData.name}</span>
      </p>
      <p>Update your information below</p>
      <form onSubmit={handleSubmit(onSubmit)} ref={form}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          {...register("name")}
          placeholder="name"
          type="text"
          defaultValue={userData.name}
        />
        <br />
        <br />
        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register("email", { required: true })}
          placeholder="email"
          required
          type="email"
          defaultValue={userData.email}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <br />
        <br />
        <input type="submit" value={`Update`} />
      </form>
    </div>
  );
};

export default UpdateUser;
