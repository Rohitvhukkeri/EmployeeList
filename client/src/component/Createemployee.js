import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigation, NavLink, useNavigate } from "react-router-dom";

const Createemployee = () => {
  const [formData, setFormData] = useState({
    studentid: "",
    name: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(`http://localhost:4000/api/v1/auth/employeecreate`, formData)
        .then((res) => {
          toast.success("user created successfully");
          navigate("/list");
          // history.push("/list");
        })
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1>Create Student</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 shadow-lg p-3 pb-0 mb-2 bg-body rounded ">
          <form onSubmit={handleSubmit}>
            <div className="form-group col ">
            <div className="row mt-2">
                <div className="col-3">
                  {" "}
                  <label>Student Id</label>
                </div>
                <div className="col-8">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Id"
                    name="studentid"
                    value={formData.studentid}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  {" "}
                  <label>Name</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  {" "}
                  <label>Marks</label>
                </div>
                <div className="col-8">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Marks"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  {" "}
                  <label>Teacher Name</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-3">
                  <label>Gender</label>
                </div>
                <div className="col-8">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    value="male"
                    // onChange={(e)=>setGender(e.target.value)}
                    onChange={handleInputChange}
                  />
                  <label class="form-check-label ms-2" for="inlineRadio1">
                    Male
                  </label>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input  ms-2"
                      type="radio"
                      name="gender"
                      value="female"
                      // onChange={(e)=>setGender(e.target.value)}
                      // onChange={() => onGenderChange('female')}
                      onChange={handleInputChange}
                    />
                    <label class="form-check-label ms-2" for="inlineRadio1">
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-3">
                  {" "}
                  <label>Subject</label>
                </div>

                <div className="col-8">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="course"
                      id="inlineRadio1"
                      value="MCA"
                      onChange={handleInputChange}

                      // onChange={(e)=>setCourse(e.target.value)}
                    />
                    <label class="form-check-label ms-2" for="inlineRadio1">
                      CSE
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input  ms-2"
                      type="checkbox"
                      name="course"
                      id="inlineRadio1"
                      value="BCA"
                      onChange={handleInputChange}
                    />
                    <label class="form-check-label ms-2" for="inlineRadio1">
                      EEE
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input  ms-2"
                      type="checkbox"
                      name="course"
                      id="inlineRadio1"
                      value="BSC"
                      onChange={handleInputChange}
                    />
                    <label class="form-check-label ms-2" for="inlineRadio1">
                      Civil
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-center mb-3">
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ width: "150px" }}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createemployee;

