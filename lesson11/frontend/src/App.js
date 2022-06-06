import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage'



export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                    {/* <Route path="/login" component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/reset-password/:token" component={ ResetPasswordPage } />
                    <Route path="/home" component={ HomePage } /> */}
                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    )
}

// const Footer = () => {
//     return (
//         <p className="text-center" style={ FooterStyle }>Designed & coded by <a href="https://izemspot.netlify.com" target="_blank" rel="noopener noreferrer">IZEMSPOT</a></p>
//     )
// }

// const FooterStyle = {
//     background: "#222",
//     fontSize: ".8rem",
//     color: "#fff",
//     position: "absolute",
//     bottom: 0,
//     padding: "1rem",
//     margin: 0,
//     width: "100%",
//     opacity: ".5"
// }