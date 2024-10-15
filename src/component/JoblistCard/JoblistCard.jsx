import React from 'react'
import styles from './JoblistCard.module.css'


function JoblistCard({position,skills,salary,jobtype,location,remote,id,isEditable,routeToJobDetail,creator,logo,cnlogo}) {
  return (
    <div className={styles.joblistcard}>
      <div className={styles.joblistcard_left}>
        <div className={styles.joblistcard_left_logo}>
            <img src={logo} alt="" />
        </div>
        <div className={styles.joblistcard_left_description}>
            <h2>{position}</h2>
            <div className={styles.salary_location}>
                <p>&#8377; {salary}</p>
                <div className={styles.flagContainer} >
                <img className={styles.cnlogo} src={cnlogo} alt="img" />
                <p>{location}</p>
                </div>
               
            </div>
            <div className={styles.joblistcard_left_description_remote_container} >
            <p>{remote ? "Remote" : "Office"}</p>
            <p>{jobtype}</p>

            </div>
        </div>
      </div>
      <div className={styles.joblistcard_right}>
        <div className={styles.joblistcard_right_skills}>
          {
            skills.map((skill,index)=>(
              <p key={index}>{skill}</p>
            ))
          }
         
        
        </div>
        <div className={styles.joblistcard_right_buttons}>
          {
            isEditable(creator) ?  <button
            
            className={styles.joblistcard_right_buttons_edit} >Edit job</button> : null
          }
       
        <button 
        onClick={()=>routeToJobDetail(id)}
        className={styles.joblistcard_right_buttons_view}>View details</button>
        </div>
      </div>
    </div>
  )
}

export default JoblistCard
