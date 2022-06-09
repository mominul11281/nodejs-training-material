import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "../../App.css";


export default function ResetPasswordPage() {
  const { token, id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const loginHandler = (event) => {
    event.preventDefault();
    console.log({
      password,
      confirmPassword,
    });
    fetch("http://localhost:3000/reset-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: id,
        token: token,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Reset Your Password</h2>
      <form onSubmit={loginHandler}>
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
            Reset Password
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
