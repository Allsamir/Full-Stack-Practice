import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState([]);
  const form = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((newUser) => setUser([...user, newUser]))
      .catch((err) => {
        console.error(err);
      });
    form.current.reset();
  };

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((user) => setUser(user))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedUser) => {
        if (deletedUser.deletedCount > 0) {
          const remainUser = user.filter((user) => user._id !== id);
          alert("User Deleted");
          setUser([...remainUser]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div>
        {user.map((user, index) => (
          <div
            style={{
              border: "1px solid white",
              margin: "16px",
              padding: "12px",
            }}
            key={index}
          >
            <p>Hello {user.name}</p>
            <p>{user.email}</p>
            <button onClick={() => handleDelete(user._id)}>x</button>
            <Link to={`/user/${user._id}`}>
              <button style={{ margin: "0 0 0 16px" }}>Update</button>
            </Link>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} ref={form}>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register("name")} placeholder="name" type="text" />
        <br />
        <br />
        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register("email", { required: true })}
          placeholder="email"
          required
          type="email"
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
