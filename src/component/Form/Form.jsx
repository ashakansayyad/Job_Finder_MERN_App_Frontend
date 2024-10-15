import React from "react";
import styles from "./Form.module.css";

const FormField = ({ name, value, type, placeholder, onChange, label }) => {
  return (
    <div className={styles.inputContainer}>
    <input
    id={name}
      className={styles.inputFields}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    {label ? <label id={name} htmlFor={name}>{label}</label> : null}
    </div>
  );
};

function Form({ formFields, error, errorMessage }) {
  return (
    <>
      <form className={styles.form}>
        {formFields.map((field, index) => (
          <>
            <FormField
              name={field.name}
              key={index}
              label={field?.label}
              type={field.type}
              value={field.value}
              placeholder={field?.placeholder}
              onChange={field.onChange}
            />
          {  error[field.name] ? <p id={styles.error}>{errorMessage[field.name].message}</p> : null  }
          </>
        ))}
       
      </form>
    </>
  );
}

export default Form;
