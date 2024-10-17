import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import recruiter_img from "../../assets/recruiter_img.png";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function Navbar() {
  const { loggedUser, isLoading } = useContext(UserContext);

  // if(!loggedUser){
  //   return null;
  // }
  

  const isLoggedIn = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_left}>
        <h2 onClick={() => navigate("/")}>Jobfinder</h2>
      </div>
      <div className={styles.navbar_right}>
        {isLoading ? (
          <div>Loading...</div>
        ) : isLoggedIn ? (
          <div className={styles.navbar_right_with_login}>
            <button onClick={handleLogout}>Logout</button>
            <p>Hello! {loggedUser === null ? "Recruiter" : loggedUser.name} </p>
            <img src={recruiter_img} alt="" />
          </div>
        ) : (
          <div className={styles.navbar_right_without_login}>
            <button
              onClick={() => navigate("/login")}
              className={styles.navbar_right_login}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className={styles.navbar_right_register}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
