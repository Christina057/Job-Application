import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', color: '#333' }}>Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <>
              <div className="banner" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {myJobs.map((element) => (
                  <div className="card" key={element._id} style={{ width: '45%', margin: '10px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <div className="content" style={{ marginBottom: '20px' }}>
                      <table style={{ width: '100%', marginBottom: '20px' }}>
                        <tbody>
                          <tr>
                            <td>Title:</td>
                            <td>
                              <input
                                type="text"
                                disabled={editingMode !== element._id}
                                value={element.title}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "title",
                                    e.target.value
                                  )
                                }
                                style={{ width: '100%' }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Country:</td>
                            <td>
                              <input
                                type="text"
                                disabled={editingMode !== element._id}
                                value={element.country}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "country",
                                    e.target.value
                                  )
                                }
                                style={{ width: '100%' }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>City:</td>
                            <td>
                              <input
                                type="text"
                                disabled={editingMode !== element._id}
                                value={element.city}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "city",
                                    e.target.value
                                  )
                                }
                                style={{ width: '100%' }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Category:</td>
                            <td>
                              <select
                                value={element.category}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "category",
                                    e.target.value
                                  )
                                }
                                disabled={editingMode !== element._id}
                                style={{ width: '100%' }}
                              >
                                <option value="Graphics & Design">
                                  Graphics & Design
                                </option>
                                <option value="Mobile App Development">
                                  Mobile App Development
                                </option>
                                <option value="Frontend Web Development">
                                  Frontend Web Development
                                </option>
                                <option value="MERN Stack Development">
                                  MERN STACK Development
                                </option>
                                <option value="Account & Finance">
                                  Account & Finance
                                </option>
                                <option value="Artificial Intelligence">
                                  Artificial Intelligence
                                </option>
                                <option value="Video Animation">
                                  Video Animation
                                </option>
                                <option value="MEAN Stack Development">
                                  MEAN STACK Development
                                </option>
                                <option value="MEVN Stack Development">
                                  MEVN STACK Development
                                </option>
                                <option value="Data Entry Operator">
                                  Data Entry Operator
                                </option>
                             </select>
                            </td>
                          </tr>
                          <tr>
                            <td>Salary:</td>
                            <td>
                              {element.fixedSalary ? (
                                <input
                                  type="number"
                                  disabled={editingMode !== element._id}
                                  value={element.fixedSalary}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "fixedSalary",
                                      e.target.value
                                    )
                                  }
                                  style={{ width: '100%' }}
                                />
                              ) : (
                                <div>
                                  <input
                                    type="number"
                                    disabled={editingMode !== element._id}
                                    value={element.salaryFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryFrom",
                                        e.target.value
                                      )
                                    }
                                    style={{ width: '49%', marginRight: '2%' }}
                                  />
                                  <input
                                    type="number"
                                    disabled={editingMode !== element._id}
                                    value={element.salaryTo}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryTo",
                                        e.target.value
                                      )
                                    }
                                    style={{ width: '49%' }}
                                  />
                                </div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Expired:</td>
                            <td>
                              <select
                                value={element.expired}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "expired",
                                    e.target.value
                                  )
                                }
                                disabled={editingMode !== element._id}
                                style={{ width: '100%' }}
                              >
                                <option value={true}>TRUE</option>
                                <option value={false}>FALSE</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                              style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                              style={{ backgroundColor: '#f44336', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                            style={{ backgroundColor: '#2196F3', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn"
                        style={{ backgroundColor: '#f44336', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p style={{ textAlign: 'center', color: '#333' }}>
              You've not posted any job or maybe you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
