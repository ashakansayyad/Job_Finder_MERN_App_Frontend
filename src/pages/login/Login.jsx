
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import Form from "../../component/Form/Form";
import { login } from "../../services/Auth";


export default function Login() {
 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/");
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const formFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      value: formData.email || "",
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, email: false }));
        }
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
      value: formData.password || "",
      onChange: (e) => {
        setFormData({ ...formData, password: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, password: false }));
        }
      },
    },
  ];

  const errorMessage = {
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    Object.keys(errorMessage).forEach((keys) => {
      if (!errorMessage[keys].isValid) {
        errorMessage[keys].onError();
        isError = true;
      }
    });
    if (!isError) {
      try {
        const res = await login(formData);
        if (res.status === 200) {
          alert("Logged in Successfully!");
          const token = res.data.token;
          localStorage.setItem("token", token);
         
          navigate("/");
          location.reload();
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.left}>
        <header className={styles.header}>
          <h2 className={styles.title}>Already have an account?</h2>
          <p className={styles.subtitle}>Your personal job finder is here</p>
        </header>
        <main className={styles.main}>
          <Form
            formFields={formFields}
            error={error}
            errorMessage={errorMessage}
          />
        </main>
        <footer className={styles.footer}>
          <button
            type="submit"
            onClick={(e) => onSubmit(e)}
            className={styles.signinBtn}
          >
            Sign in
          </button>
          <p className={styles.desc}>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")} id={styles.sign}>
              Sign Up
            </span>
          </p>
        </footer>
      </div>
      <div className={styles.right}>
        <h2 className={styles.leftTitle}>Your Personal Job Finder</h2>
      </div>
    </div>
  );
}
