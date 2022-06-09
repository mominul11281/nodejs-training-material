import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../App.css';


export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const loginHandler = (event) => {
        event.preventDefault();
        console.log({
            email,password
        });
        fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.success) history.push('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={loginHandler}>
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
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
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
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
