import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../component/Form/Form";
import styles from "./Addjob.module.css";
import { addJob } from "../../services/job";
import { useParams } from "react-router-dom";
import { getJobById,editJob } from "../../services/job";

export default function Addjob() {
  const {id} =useParams();
  console.log("id:  ",id);
  const isEdit  = !!id;   //If id is a truthy value (like a non-empty string or number), !!id becomes true.
  console.log("isEdit",isEdit);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    cnlogo: "",
    position: "",
    salary: "",
    jobType: "",
    remote: "",
    location: "",
    description: "",
    about: "",
    information: "",
    skills: "",
  });

  const ChosenSkills = () => {
    return (
      <div>
        {formData.skills.split(",").map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}
      </div>
    );
  };

  const formFields = [
    {
      name: "name",
      type: "text",
      fieldName: "Company Name ",
      value: formData.name,
      placeholder: "Enter your company name here",
      onChange: (e) => {
        setFormData({ ...formData, name: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, name: false }));
        }
      },
    },
    {
      name: "logo",
      type: "text",
      fieldName: "Add logo URL",
      placeholder: "Enter the link",
      value: formData.logo,
      onChange: (e) => {
        setFormData({ ...formData, logo: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, logo: false }));
        }
      },
    },
    {
      name: "cnlogo",
      type: "text",
      fieldName: "Country logo URL",
      value: formData.cnlogo,
      placeholder: "Enter the country flag link",
      onChange: (e) => {
        setFormData({ ...formData, cnlogo: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, cnlogo: false }));
        }
      },
    },
    {
      name: "position",
      type: "text",
      fieldName: "Job position",
      value: formData.position,
      placeholder: "Enter job position",
      onChange: (e) => {
        setFormData({ ...formData, position: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, position: false }));
        }
      },
    },
    {
      name: "salary",
      type: "number",
      fieldName: "Monthly salary",
      value: formData.salary,
      placeholder: "Enter Amount in rupees",
      onChange: (e) => {
        setFormData({ ...formData, salary: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, salary: false }));
        }
      },
    },
    {
      name: "jobType",
      type: "dropdown",
      fieldName: "Job Type",
      values: ["Full-Time", "Part-Time", "Contract", "Internship"],
      value: formData.jobType,
      onChange: (e) => {
        setFormData({ ...formData, jobType: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, jobType: false }));
        }
      },
    },
    {
      name: "remote",
      type: "dropdown",
      fieldName: "Remote/office",
      values: ["Remote", "Office"],
      value: formData.remote,
      onChange: (e) => {
        setFormData({ ...formData, remote: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, remote: false }));
        }
      },
    },
    {
      name: "location",
      type: "text",
      fieldName: "Location",
      value: formData.location,
      placeholder: "Enter Location",
      onChange: (e) => {
        setFormData({ ...formData, location: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, location: false }));
        }
      },
    },
    {
      name: "description",
      type:"textarea",
      fieldName: "Job Description",
      value: formData.description,
      placeholder: "Type the job description",
      onChange: (e) => {
        setFormData({ ...formData, description: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, description: false }));
        }
      },
    },
    {
      name: "about",
      type: "textarea",
      fieldName: "About Company",
      value: formData.about,
      placeholder: "Type about your company",
      onChange: (e) => {
        setFormData({ ...formData, about: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, about: false }));
        }
      },
    },
    {
      name: "skills",
      type: "text",
      fieldName: "Skills Required",
      chosen: <ChosenSkills />,
      value: formData.skills,
      placeholder: "Enter job skills (add comma for separate skills)",
      onChange: (e) => {
        setFormData({ ...formData, skills: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, skills: false }));
        }
      },
    },
    {
      name: "information",
      type: "text",
      fieldName: "Information",
      value: formData.information,
      placeholder: "Enter the additional information",
      onChange: (e) => {
        setFormData({ ...formData, information: e.target.value });
        if (e.target.value.length > 0) {
          setError((error) => ({ ...error, information: false }));
        }
      },
    },
  ];

  const [error, setError] = useState({
    name: false,
    logo: false,
    cnlogo: false,
    position: false,
    salary: false,
    jobType: false,
    remote: false,
    location: false,
    description: false,
    about: false,
    information: false,
    skills: false,
  });

  const errorMessage = {
    name: {
      message: "Company name is required",
      isValid: formData.name.length > 0,
      onError: () => {
        setError((error) => ({ ...error, name: true }));
      },
    },
    logo: {
      message: "Company logo is required",
      isValid: formData.logo.length > 0,
      onError: () => {
        setError((error) => ({ ...error, logo: true }));
      },
    },
    cnlogo: {
      message: "country logo is required",
      isValid: formData.cnlogo.length > 0,
      onError: () => {
        setError((error) => ({ ...error, cnlogo: true }));
      },
    },
    position: {
      message: "Job position is required",
      isValid: formData.position.length > 0,
      onError: () => {
        setError((error) => ({ ...error, position: true }));
      },
    },
    salary: {
      message: "Salary is required and should be a number",
      isValid:formData.salary.length > 0,
      onError: () => {
        setError((error) => ({ ...error, salary: true }));
      },
    },
    jobType: {
      message: "job Type is required",
      isValid: formData.jobType.length > 0,
      onError: () => {
        setError((error) => ({ ...error, jobType: true }));
      },
    },
    remote: {
      message: "Company name is required",
      isValid: formData.remote.length > 0,
      onError: () => {
        setError((error) => ({ ...error, remote: true }));
      },
    },
    location: {
      message: "location is required",
      isValid: formData.location.length > 0,
      onError: () => {
        setError((error) => ({ ...error, location: true }));
      },
    },
    description: {
      message: "description is required",
      isValid: formData.description.length > 0,
      onError: () => {
        setError((error) => ({ ...error, description: true }));
      },
    },
    about: {
      message: "about is required",
      isValid: formData.about.length > 0,
      onError: () => {
        setError((error) => ({ ...error, about: true }));
      },
    },
    information: {
      message: "information is required",
      isValid: formData.information.length > 0,
      onError: () => {
        setError((error) => ({ ...error, information: true }));
      },
    },
    skills: {
      message: "skillsis required",
      isValid: formData.skills.length > 0,
      onError: () => {
        setError((error) => ({ ...error, skills: true }));
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    Object.keys(errorMessage).forEach((key) => {
      if (!errorMessage[key].isValid) {
        isError = true;
        errorMessage[key].onError();
      }
    });
    if (!isError) {
      try {
        console.log(formData);

        const res = isEdit ? await editJob(formData,id) :await addJob(formData);

        if (res.status === 201) {
          alert(`Job added Successfully!`); // Notify the user of successful registration
          navigate("/list");
        }
        else if(res.status === 200){
          alert(`Job updated Successfully!`); // Notify the user of successful registration
          navigate("/list");
        }
      } catch (err) {
        // Handle errors like 400 (User already exists) or others
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          alert("Something went wrong!");
        }
      }
    }
  };

const fillJobData=(data)=>{
  const {name,
    logo,
    cnlogo,
    position,
    salary,
    jobType,
    remote,
    location,
    description,
    about,
    information,
    skills} = data;
    // const jobSkills = skills.map((item)=>item[0]).join(",");
    setFormData({name,
      logo,
      cnlogo,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      information,
      skills
    })
}

useEffect(()=>{
  if(isEdit){
    getJobById(id).then(res=>{
      fillJobData(res.data);
      // setFormData(res.data)
    })
  }
},[isEdit]);







  return (
    <div className={styles.Container}>
      <div className={styles.left}>
        <header className={styles.header}>
          <h2 className={styles.title}>Add job description</h2>
        </header>
        <main className={styles.main}>
          {/* <form className={styles.form}>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Company Name </h3>
              <input
                type="text"
                className={styles.cname}
                placeholder="Enter your company name here"
              />
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Add logo URL</h3>
              <input
                type="text"
                className={styles.clogo}
                placeholder="Enter the link"
              />
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Job position </h3>
              <input
                type="text"
                className={styles.cposition}
                placeholder="Enter job position"
              />
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Monthly salary</h3>
              <input
                type="number"
                className={styles.salary}
                placeholder="Enter Amount in rupees"
              />
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Job Type </h3>
              <select className={styles.jtype}>
                <option value="">xyz</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Remote/office</h3>
              <select className={styles.jremote}>
                <option value="">xyz</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Location</h3>
              <input
                type="text"
                className={styles.clocation}
                placeholder="Enter Location"
              />
            </div>
            <div className={styles.inputContainertext}>
              <h3 className={styles.formTitles}>Job Description</h3>
              <textarea
                className={styles.jdescription}
                placeholder="Type the job description"
              />
            </div>
            <div className={styles.inputContainertext}>
              <h3 className={styles.formTitles}>About Company</h3>
              <textarea
                className={styles.jabout}
                placeholder="Type about your company"
              />
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Skills Required</h3>
              <input
                type="text"
                className={styles.jskills}
                placeholder="Enter the must have skills"
              />
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.formTitles}>Information</h3>
              <input
                type="text"
                className={styles.addInfo}
                placeholder="Enter the additional information"
              />
            </div>
          </form> */}
          <Form
            error={error}
            formFields={formFields}
            errorMessage={errorMessage}
          />
        </main>
        <footer className={styles.footer}>
          <button
            onClick={() => navigate("/list")}
            className={styles.cancleBtn}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className={styles.addjbBtn}
          >
          { isEdit ?"Update" : "+ Add Job"}
          </button>
        </footer>
      </div>
      <div className={styles.right}>
        <h2 className={styles.leftTitle}>Recruiter add job details here</h2>
      </div>
    </div>
  );
}
