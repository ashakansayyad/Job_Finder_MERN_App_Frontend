import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Addjob.module.css";
export default function Addjob() {
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <div className={styles.left}>
        <header className={styles.header}>
          <h2 className={styles.title}>Add job description</h2>
        </header>
        <main className={styles.main}>
          <form className={styles.form}>
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

            
          </form>
        </main>
        <footer className={styles.footer}>
          <button type="submit" className={styles.cancleBtn}>
          Cancel
          </button>
          <button type="submit" 
          onClick={()=>navigate('/login')}
          className={styles.addjbBtn}>
          + Add Job
          </button>
        
        </footer>
      </div>
      <div className={styles.right}>
        <h2 className={styles.leftTitle}>Recruiter add job details here</h2>
      </div>
    </div>
  );
}
