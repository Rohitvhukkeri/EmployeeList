import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from 'moment';

const Listofemployee = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [count, setCount] = useState([]);

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
        <h5>Employee List</h5>
      </div>
      <div className="d-flex justify-content-end container">
        <p className="col-3">Toatl count :  {count} </p>

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
          />
        </form>
      </div>

      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Unique Id</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Designatin</th>
              <th scope="col">Gender</th>
              <th scope="col">Course</th>
              <th scope="col">Created Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
         {
          allUsers && allUsers.map((item,index)=>{
            return (
              <tr>
                <td>

                </td>
                <td>
                  <img src={item.image.url} alt="" width={"50px"} height={"50px"}/>
                </td>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.email}
                </td>
                <td>
                  {item.mobile}
                </td>
                <td>
                  {item.designation}
                </td>
                <td>
                  {item.gender}
                </td>
                <td>
                  {item.course}
                </td>
                <td>
                {moment().format("DD MM YYYY")}
                  {/* {item.createdAt} */}

                </td>
                <td>
                  <NavLink to={`/edit/${item._id}`}>Edit</NavLink>
                </td>
              </tr>
            )
          })
         }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listofemployee;
