
import {getAllJobs} from '../../services/job';
import {useState,useEffect} from 'react';
import styles from './Joblist.module.css';
import {useNavigate} from 'react-router-dom';
import {isEditable} from '../../helper/helper'
import JoblistCard from '../../component/JoblistCard/JoblistCard';
import Navbar from '../../component/Navbar/Navbar'



export default function Joblist(){

const [jobs,setJobs] = useState([]);
const [isLoading,setIsLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        if (res && Array.isArray(res.data)) {
          setJobs(res.data);  // Set jobs only if it's an array
        } else {
          console.error("API response is not an array");
          setJobs([]);  // Set an empty array to avoid errors
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching jobs: ", err);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

    const routeToJobDetail=(id)=>{
       if(id === undefined){
        alert("Please login first!");
        navigate('/login');
       }else{

           navigate(`/list/${id}`)
       }
    };

  if(isLoading){
    return <p>Loading...</p>;
  }




    return (
        <>
        <Navbar  />
         <div  className={styles.Joblist}>
           {
            jobs.length > 0 ? (
                
                jobs.map((item)=>{
                  return <JoblistCard
                  key={item._id}
                  position={item.position} 
                  skills={item.skills}
                  salary={item.salary}
                  jobtype={item.jobType}
                  location={item.location}
                  remote={item.remote}
                  id={item._id}
                  logo={item.logo}
                  cnlogo={item.cnlogo}
                  isEditable={isEditable}
                  routeToJobDetail={routeToJobDetail}
                  creator={item.creator}
                 
                  />
                })
            ):(
                <p>Loading....</p>
            )
           }
        </div>
        </>
       
    )
}
