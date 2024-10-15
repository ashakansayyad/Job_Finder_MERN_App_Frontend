import React, { useEffect, useState } from "react";
import styles from './Jobdetail.module.css';
import JobdetailCard from "../../component/JobdetailCard/JobdetailCard";
import { getJobById } from "../../services/job";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
export default function Jobdetail() {
  const [jobById, setJobById] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
 
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        if (res && res.data) {
          setJobById(res.data);
         
        } else {
          setIsError(true);
          console.log("No job data found");
          
        }
      } catch (err) {
        setIsError(true);
        alert(err.response.data.message);
        navigate('/login');
      }finally{
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const navigateToEditPage = () => {
    navigate(`editjob/${id}`);
  };

  return (
    <>
      <Navbar />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Somtheing went wrong</p>
      ) : (
        <div className={styles.jobdetail}>
          <JobdetailCard navigateToEditPage={navigateToEditPage} jobById={jobById} />
        </div>
      )}
    </>
  );
}
