import React from "react";
import styles from "./Form.module.css";

const FormField = ({
  name,
  value,
  type,
  placeholder,
  onChange,
  label,
  values,
  fieldName,
  chosen,
}) => {
  return (
    <div className={ fieldName ? styles.fieldContainer : styles.inputContainer}>
      {type === "dropdown" ? (
        <>
         <select 
        className={styles.inputFields}
        value={value}
        label={label}
        id={name}
        fieldName={fieldName}
        onChange={onChange} >
          {values.map((value, idx) => (
            <option key={idx} value={value}>
              {value}
            </option>
          ))}
        </select>
        {
          fieldName &&  <h3 id={name} htmlFor={name}>{fieldName}</h3>
        }
        </>

        
      ) : (
        <>
          <input
            id={name}
            className={styles.inputFields}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
              {chosen ? chosen : null}
          {label ? (
            <label id={name} htmlFor={name}>
              {label}
            </label>
          ):(
            <h3>{fieldName}</h3>
          )
        }

        </>
      )}
     
    </div>
  );
};

function Form({ formFields, error, errorMessage }) {
  return (
    <>
      <form className={styles.form}>
        {formFields.map((field, index) => (
           <React.Fragment key={index}>
            <FormField
              name={field.name}
              key={index}
              label={field?.label}
              fieldName={field?.fieldName}
              type={field.type}
              value={field.value}
              values={field.values}
              placeholder={field?.placeholder}
              onChange={field.onChange}
            />
            {error[field.name] ? (
              <p id={field?.fieldName ? styles.addError : styles.error}>{errorMessage[field.name].message}</p>
            ) : null}
          </React.Fragment>
        ))}
      </form>
    </>
  );
}

export default Form;
