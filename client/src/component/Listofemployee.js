import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import moment from "moment";

const Listofemployee = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [count, setCount] = useState([]);
  const [search, setSearch] = useState("");

  console.log("list>>", allUsers);
  const readAllUsers = async () => {
    const userList = await axios.get(
      `http://localhost:4000/api/v1/auth/allUsers`
      //   {
      //     headers: { Authorization: token },
      //   }
    );
    setAllUsers(userList.data.users);
    setCount(userList.data.length)
    console.log("iiiiii",userList)
  };
  useEffect(() => {
    readAllUsers();
  }, []);

  return (
    <div>
      <div className="">
        <h5>Marks List</h5>
      </div>
      <div className="d-flex justify-content-end container">
        <p className="col-3">Total count : {count} </p>

        <NavLink to={"/create"}>
          <button type="submit" class="btn btn-primary">
            Create
          </button>
        </NavLink>
      </div>

      <div className="d-flex justify-content-end col-11">
        <form class="d-flex" role="search">
          <button class="btn btn-success" type="submit">
            Search
          </button>
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {/* {allUsers.filter((item)=> item.email.toLocaleLowerCase().includes(search))} */}
      </div>

      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Unique Id</th>
              <th scope="col">Student Id</th>
              <th scope="col">Name</th>
              <th scope="col">Marks</th>
              <th scope="col">Teacher Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Subject</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.filter((item)=> (item.name.toLocaleLowerCase().includes(search))).map((item, index) => {
                return (
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.studentid}</td>
                    <td>{item.name}</td>
                    {/* <td>{item.email}</td> */}
                    <td>{item.mobile}</td>
                    <td>{item.designation}</td>
                    <td>{item.gender}</td>
                    <td>{item.course}</td>
                    {/* <td>
                      {moment().format("DD MM YYYY")}
                      {/* {item.createdAt} */}
                    {/* </td>  */}
                    <td>
                      <NavLink to={`/edit/${item._id}`}>Edit</NavLink>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listofemployee;
