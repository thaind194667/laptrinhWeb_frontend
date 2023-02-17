// import { signIn } from 'next-auth/react'
import React from "react";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setType } from "../../storage";
import axios from "axios";

// import banner from 'public/images/logo.jpg'
// import google from 'public/images/logo/google.png'
// import pionero from 'public/images/pionero.jpg'
const url = "http://localhost:3001/user/register.php";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({});
  const [text, setText] = useState("");

  async function check() {
    document.getElementById("noUsername").hidden = true;
    document.getElementById("noPassword").hidden = true;
    document.getElementById("noConfirmPassword").hidden = true;
    document.getElementById("notConfirmPassword").hidden = true;

    var username = document.getElementById("username");
    // alert("username:" + username.value)
    if (username.value === "") {
      document.getElementById("noUsername").hidden = false;
      return false;
    } else document.getElementById("noUsername").hidden = true;

    var password = document.getElementById("password");
    if (password.value === "") {
      document.getElementById("noPassword").hidden = false;
      console.log(password);
      return false;
    } else document.getElementById("noPassword").hidden = true;

    var confirmPassword = document.getElementById("confirm_password");
    if (confirmPassword.value === "") {
      document.getElementById("noConfirmPassword").hidden = false;
      document.getElementById("notConfirmPassword").hidden = true;

      return false;
    } else if (confirmPassword.value !== password.value) {
      document.getElementById("notConfirmPassword").hidden = false;
      document.getElementById("noConfirmPassword").hidden = true;

      return false;
    } else {
      document.getElementById("noConfirmPassword").hidden = true;
      document.getElementById("notConfirmPassword").hidden = true;
    }

    ///send data
    console.log(username.value);
    const data = await axios.post(url, {
      username: username.value,
      password: password.value,
    });

    console.log(data);
    if (data.data[0] !== "Register sucessfully!!!") {
      setText(data.data[0]);
    } else {
      setText("");
      navigate("/login");
    }
  }

  //   function handleSignIn(e) {
  //     e.preventDefault()
  //   }

  return (
    <>
      <div className={styles.container1}>
        <div className={styles.bound}>
          <header>
            <title>PingDaily</title>
          </header>
          <div className={styles.container}>
            <form action="">
              <h1>Register</h1>
              <div className={styles.form_control}>
                <input
                  id="username"
                  type="text"
                  style={{ paddingLeft: "10px", borderRadius: "8px" }}
                  className={styles.username}
                  placeholder="Username"
                />
                <div id="noUsername" style={{ color: "red" }} hidden={true}>
                  Username is required
                </div>
                <span></span>
              </div>
              {/* <div className={styles.form_control}>
            <input id="email" type="email" className={styles.email} placeholder="Email" />
            <small>Email is required</small>
            <span></span>
        </div> */}
              <div className={styles.form_control}>
                <input
                  id="password"
                  type="password"
                  className={styles.Password}
                  style={{ paddingLeft: "10px", borderRadius: "8px" }}
                  placeholder="Password"
                />
                <div id="noPassword" style={{ color: "red" }} hidden={true}>
                  Password is required
                </div>
                <span></span>
              </div>
              <div className={styles.form_control}>
                <input
                  id="confirm_password"
                  type="password"
                  className={styles.confirm_password}
                  style={{ paddingLeft: "10px", borderRadius: "8px" }}
                  placeholder="Confirm password"
                />
                <small
                  id="noConfirmPassword"
                  style={{ color: "red" }}
                  hidden={true}
                >
                  Confirm password is required
                </small>
                <small
                  id="notConfirmPassword"
                  style={{ color: "red" }}
                  hidden={true}
                >
                  Confirm password is not correct
                </small>
                <small
                  id="notConfirmPassword"
                  style={{ color: "red" }}
                  // hidden={true}
                >
                  {text}
                </small>
                <span></span>
              </div>

              <button
                type="button"
                onClick={check}
                className={styles.btn_submit}
              >
                Register
              </button>
              <div className={styles.signup_link}>
                Already has an account? <a href="/login">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
