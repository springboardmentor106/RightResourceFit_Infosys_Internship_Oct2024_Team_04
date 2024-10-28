import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/UserSidebar";
import styles from "../styles/UserActiveJobs.module.css";

interface Salary {
  amount: number;
  type: string;
  frequency: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  skills: string[];
  employmentType: string[];
  workingSchedule: string[];
  salary: Salary;
  isHiringMultiple: boolean;
}

const ActiveJobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/postings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchValue) ||
      job.description.toLowerCase().includes(searchValue) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchValue)) ||
      job.location.toLowerCase().includes(searchValue)
    );

    setFilteredJobs(filtered);
  };

  return (
    <>
    <Sidebar />
    <div className={styles.background}>
      <div className={styles.container}>
   
        <div className={styles.content}>
          <h1 className={styles.head}>Active Jobs</h1>
          <div className={styles.searchBar}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search jobs by title, skills or location"
            />
          </div>
          {(searchTerm ? filteredJobs : jobs).length > 0 ? (
            <div className={styles.jobList}>
              {(searchTerm ? filteredJobs : jobs).map((job) => (
                <div key={job._id} className={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Skills:</strong> {job.skills.join(", ")}</p>
                  <p><strong>Employment Type:</strong> {job.employmentType.join(", ")}</p>
                  <p><strong>Working Schedule:</strong> {job.workingSchedule.join(", ")}</p>
                  <p><strong>Salary:</strong> {job.salary.amount} {job.salary.type} ({job.salary.frequency})</p>
                  <p><strong>Hiring Multiple Candidates:</strong> {job.isHiringMultiple ? "Yes" : "No"}</p>
                  <button className={styles.applyButton}>Apply</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No job postings available.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ActiveJobPage;
