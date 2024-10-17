import React from 'react';
import stipend_icon from '../../assets/stipend.png';
import duration_icon from '../../assets/duration.png';
import styles from './JobdetailCard.module.css';
import { useNavigate } from 'react-router-dom';
import { isEditable } from '../../helper/helper';
function JobdetailCard({jobById}) {
  const navigate = useNavigate();

  return (
    <div className={styles.jobdetailcard} >
     
      <div className={styles.jobdetailcard_header}> 
          <div className={styles.jobdetailcard_header_topContainer}>
            <p>1w ago . {jobById.jobType}</p> <p><img style={{width:"50px",height:"auto",borderRadius:"8px"}} src={jobById.logo} alt="img" /> {jobById.name}</p>
          </div>
          <div className={styles.jobdetailcard_header_titleContainer}>
            <h2>{jobById.position}</h2>
           {isEditable(jobById.creator) ? <button onClick={()=>navigate(`/editjob/${jobById._id}`)} >Edit job</button> : null } 
          </div>
          <div className={styles.jobdetailcard_header_joblocation}><img style={{width:"40px",height:"auto",borderRadius:"4px"}} src={jobById.cnlogo} alt="logo" />| {jobById.location}</div>
          <div className={styles.jobdetailcard_header_stipendContainer}>
              <div className={styles.jobdetailcard_header_stipendContainer_left}>
                <span><img src={stipend_icon} alt="" /><p id={styles.stipend}>Stipend</p></span>
                <p>Rs {jobById.salary}/month</p>
              </div>
              <div className={styles.jobdetailcard_header_stipendContainer_right}>
              <span><img src={duration_icon} alt="" /><p id={styles.duration}>Duration</p></span>
              <p>6 Months</p>
              </div>
          </div>
      </div>
      <div className={styles.jobdetailcard_main}> 
          <div className={styles.jobdetailcard_main_aboutContainer}>
            <h2>About company</h2>
            <p>{jobById.about}</p>
          </div>
          <div className={styles.jobdetailcard_main_jobContainer}>
          <h2>About the  job/internship</h2>
          <p>{jobById.description}</p>
          </div>
      </div>
      <div className={styles.jobdetailcard_footer}> 
        <div className={styles.jobdetailcard_footer_skillsContainer}>
          <h2>Skill(s) required</h2>
         <div>{jobById.skills.map((item,idx)=>(<div key={idx}>{item}</div>))}</div> 
        </div>
        <div className={styles.jobdetailcard_footer_infoContainer}>
          <h2>Additional Information</h2>
          <p>{jobById.information}</p>
        </div>
      </div>
    </div>
  )
}

export default JobdetailCard
