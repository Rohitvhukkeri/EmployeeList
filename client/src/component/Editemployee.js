import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Editemployee = () => {
  // const [emp, setEmp] = useState("");
  // console.log("emo>>>", emp);
  const [emp, setEmp] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: "https://picsum.photos/id/237/200/300",
  });
  const params = useParams();
  const navigate= useNavigate();
  const getEmp = async (id) => {
    let res = await axios.get(
      `http://localhost:4000/api/v1/auth/userinfo/${id}`
    );
    setEmp(res.data.data);
  };
  useEffect(() => {
    getEmp(params.id);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmp({
      ...emp,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .patch(`http://localhost:4000/api/v1/auth/employeeedit/${params.id}`, emp)
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
        <h1>Edit Employee</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 shadow-lg p-3 pb-0 mb-2 bg-body rounded ">
          <form onSubmit={handleSubmit}>
            <div className="form-group col ">
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
                    value={emp.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  {" "}
                  <label>Email</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    name="name"
                    value={emp.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  {" "}
                  <label>Mobile Number</label>
                </div>
                <div className="col-8">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    name="mobile"
                    value={emp.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  {" "}
                  <label>Designation</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Designation"
                    name="designation"
                    value={emp.designation}
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
                    checked={emp?.gender === "Male"}
                    // onChange={handleInputChange}
                  />
                  <label class="form-check-label ms-2" for="inlineRadio1">
                    Male
                  </label>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input  ms-2"
                      type="radio"
                      name="gender"
                      id="inlineRadio1"
                      value="female"
                      // checked={formData.gender === emp?.female}
                      checked={emp?.gender === "Female"}

                      // onChange={handleInputChange}
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
                  <label>Course</label>
                </div>

                <div className="col-8">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="course"
                      id="inlineRadio1"
                      value="course"
                      checked={emp?.course === "MCA"}
                    />
                    <label class="form-check-label ms-2" for="inlineRadio1">
                      MCA
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input  ms-2"
                      type="checkbox"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="bca"
                      checked={emp?.course === "BCA"}
                    />
                    <label class="form-check-label ms-2" for="inlineRadio1">
                      BCA
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input  ms-2"
                      type="checkbox"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                      checked={emp?.course === "BSC"}
                    />
                    <label class="form-check-label ms-2" for="inlineRadio1">
                      BSC
                    </label>
                  </div>
                </div>
              </div>

              <div class="mb-3 d-flex mt-2">
                <div className="col-3 ">
                  <label for="formFile" class="form-label">
                    Image Upload
                  </label>
                </div>
                <div className="col-8">
                  <input class="form-control" type="file" id="formFile" />
                </div>
              </div>

              <div className="text-center mb-3">
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ width: "150px" }}
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editemployee;
