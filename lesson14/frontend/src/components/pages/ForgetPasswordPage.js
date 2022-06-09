import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../App.css";


export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const forgetPasswordHandler = (event) => {
    event.preventDefault();
    console.log({
      email: email,
    });
    fetch("http://localhost:3000/send-reset-password-mail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
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
      <h2>Reset your password</h2>
      <h5>Enter your email address and we will send you a new password</h5>
      <form onSubmit={forgetPasswordHandler}>
        <p>
          <label id="reset_pass_lbl">Email address</label>
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
          <button id="sub_btn" type="submit">
            Send password reset email
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
