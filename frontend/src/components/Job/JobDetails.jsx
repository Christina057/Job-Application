import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });
        setJob(response.data.job);
      } catch (error) {
        navigateTo("/notfound");
      }
    };

    if (!isAuthorized) {
      navigateTo("/login");
    } else {
      fetchJobDetails();
    }
  }, [id, isAuthorized, navigateTo]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <section className="jobDetail page" style={{ padding: "50px 20px" }}>
      <div className="container">
        <h3 style={{ marginTop: "0", marginBottom: "50px" }}>Job Details</h3>
        <div className="table-container" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0 }}>
            <tbody>
              <tr style={{ background: "#008080", color: "white" }}>
                <th style={{ padding: "12px 15px", textAlign: "left" }}>Field</th>
                <th style={{ padding: "12px 15px", textAlign: "left", borderRight: "1px solid #ddd" }}>Value</th>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Title:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{job.title}</td>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Category:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{job.category}</td>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Country:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{job.country}</td>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>City:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{job.city}</td>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Location:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{job.location}</td>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Description:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{job.description}</td>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Job Posted On:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{job.jobPostedOn}</td>
              </tr>
              <tr style={{ background: "#f2f2f2" }}>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Salary:</td>
                <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                  {job.fixedSalary ? (
                    <span>{job.fixedSalary}</span>
                  ) : (
                    <span>
                      {job.salaryFrom} - {job.salaryTo}
                    </span>
                  )}
                </td>
              </tr>
              {/* Add more rows as needed */}
              
              {/* Apply Now button */}
              {user && user.role !== "Employer" && (
  <tr style={{ backgroundColor: "#f2f2f2" }}>
    <td style={{ padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #ddd" }} colSpan="2">
    <button style={{ width: "100%", backgroundColor: "#f2f2f2", color: "black", fontWeight: "bold", padding: "15px", fontSize: "16px" }} onClick={() => navigateTo(`/application/${id}`)}>
  Apply
</button>
    </td>
  </tr>
)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
