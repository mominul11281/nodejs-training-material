import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../../App.css";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const registerHandler = (event) => {
    event.preventDefault();
    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={registerHandler}>
        <p>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            name="name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </p>
        <p>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
