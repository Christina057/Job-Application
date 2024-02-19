import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page bg-gray-200 py-8">
      <style>
        {`
          .jobs .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }

          .jobs .bg-white {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.2s ease-in-out;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .jobs .bg-white:hover {
            transform: scale(1.05);
          }

          .jobs .p-4 {
            padding: 2rem;
          }

          .jobs .rounded-md {
            border-radius: 12px;
          }

          .jobs .text-lg {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #1a202c;
          }

          .jobs .text-gray-600 {
            color: #4a5568;
            margin-bottom: 1rem;
          }

          .jobs .text-blue-500 {
            color: #3182ce;
          }

          .jobs .text-blue-500:hover {
            text-decoration: underline;
          }

          .jobs .job-details-button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #4caf50;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            text-decoration: none;
            border-radius: 8px;
            transition: background-color 0.3s ease-in-out;
          }

          .jobs .job-details-button:hover {
            background-color: #45a049;
          }
        `}
      </style>
      <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-8">ALL AVAILABLE JOBS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div key={element._id} className="bg-white p-4 rounded-md shadow-md">
                <p className="text-lg font-semibold mb-2">{element.title}</p>
                <p className="text-gray-600 mb-2">{element.category}</p>
                <p className="text-gray-600 mb-2">{element.country}</p>
                <Link
                  to={`/job/${element._id}`}
                  className="job-details-button"
                >
                  Job Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
