import React, { isValidElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Form from '../../component/Form/Form';
import { register } from "../../services/Auth";
export default function Register() {
  const navigate = useNavigate();
  // form input states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    checkbox: false,
  });

  // error states
  const [error, setError] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
    checkbox: false,
  });

  const formFields = [
    {
      name: "name",
      type: "text",
      value: formData.name,
      placeholder: "Enter Your Name",
      onChange: (e) => {
        setFormData({ ...formData, name: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, name: false }));
        }
      },
    },
    {
      name: "email",
      type: "email",
      value: formData.email,
      placeholder: "Enter Your Email",
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, email: false }));
        }
      },
    },
    {
      name: "mobile",
      type: "number",
      value: formData.mobile,
      placeholder: "Enter Mobile Number",
      onChange: (e) => {
        setFormData({ ...formData, mobile: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, mobile: false }));
        }
      },
    },
    {
      name: "password",
      type: "password",
      value: formData.password,
      placeholder: "Enter Your Password",
      onChange: (e) => {
        setFormData({ ...formData, password: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, password: false }));
        }
      },
    },
    {
      name: "checkbox",
      type: "checkbox",
      label:
        "By creating an account, I agree to our terms of use and privacy policy",
      value: formData.checkbox,
      onChange: (e) => {
        setFormData({ ...formData, checkbox: e.target.checked });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, checkbox: false }));
        }
      },
    },
  ];

  const errorMessage = {
    name: {
      message: "Name is required",
      isValid: formData.name.length > 0, // Check if the name field is not empty (validation logic)
      onError: () => {
        setError(
          (
            error // (error) is the current state of the 'error' object, passed in as a function argument
          ) => ({
            ...error, // Spread the current error state to preserve other fields' error statuses
            name: true, // Set the 'name' field error to true, indicating validation failure
          })
        );
      },
    },
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    mobile: {
      message: "Mobile no is required",
      isValid: formData.mobile.length > 0,
      onError: () => {
        setError((error) => ({ ...error, mobile: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
    checkbox: {
      message: "You must agree to terms and conditions",
      isValid: formData.checkbox,
      onError: () => {
        setError((error) => ({ ...error, checkbox: true }));
      },
    },
  };
  const onSubmit = async (e) => {
    let isError = false; // Variable to track if there are any errors
    e.preventDefault(); // Prevent the default form submission behavior (e.g., page reload)

    // Loop through the errorMessage object keys to check if any input is invalid
    Object.keys(errorMessage).forEach((keys) => {
      if (!errorMessage[keys].isValid) {
        // Check if a field is invalid
        isError = true; // If invalid, set isError to true
        errorMessage[keys].onError(); // Call the onError function to display the error
      }
    });

    // If no errors were found, proceed with the registration process
    if (!isError) {
      try{
        const res = await register(formData); // Call the register function with form data and wait for the response

        // Check if the registration was successful (status code 201)
        if (res.status === 201) {
          alert("User Register Successfully!"); // Notify the user of successful registration
          navigate("/login"); // Redirect to the homepage
        }
      }catch(err){
          // Handle errors like 400 (User already exists) or others
          if(err.response && err.response.status === 400){
            alert(err.response.data.message);
          }else{
            alert("Something went wrong!");
          }
      }
  
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.left}>
        <header className={styles.header}>
          <h2 className={styles.title}>Create an account</h2>
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
        <button onClick={(e)=>onSubmit(e)}
          type="submit" className={styles.registerBtn}>
            Create Account
          </button>
          <p className={styles.desc}>
            Already have an account?
            <span onClick={() => navigate("/login")} id={styles.sign}>
              Sign In
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
