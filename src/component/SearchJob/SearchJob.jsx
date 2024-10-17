import React from 'react';
import styles from './SearchJob.module.css';
import { useNavigate } from 'react-router-dom';

function SearchJob({ search, setSearch, handleSearch, clearSearch }) {
  const token = localStorage.getItem("token");
  const naviget= useNavigate();
  return (
    <div className={styles.searchjob}>
      <div className={styles.search_bar}>
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => clearSearch()}
          placeholder="Type any job title"
        />
      </div>

      <div className={styles.skills_dropdown}>
        <button className={styles.skills_button}>Skills <span>&#9662;</span></button>
        {token &&  <button onClick={() => naviget('/addjob')} className={styles.apply_btn}>Add job</button>}
      </div>

      <div className={styles.action_buttons}>
        <button onClick={() => handleSearch()} className={styles.apply_btn}>Apply Filter</button>
        <button onClick={() => clearSearch()} className={styles.clear_btn}>Clear</button> {/* Corrected here */}
      </div>
    </div>
  );
}

export default SearchJob;
