import React, { useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function LoginPage() {
  const [user,setUser] = useState({
    email:"",
    password:"",
  }) 

  const navigate = useNavigate();
  // const { errors, validate} = useValidateReg()


  const readValue = (e) =>{
    const { name, value } = e.target;
    // validate(name,value);
    setUser({...user, [name]:value})
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{
      await axios.post(`http://localhost:4000/api/v1/auth/login`,user).then(res =>{
        toast.success("login successful")
        localStorage.setItem('loginToken', true)
        navigate('/home')
        window.location.reload();
      }).catch(err => toast.error(err.response.data.msg));
    }catch(error){
      toast.error(error.response.data.msg)
    }
  }

  return (
    <div>
     
        <div className="container">
          <div className=" mt-5">
            <div className="text-center">
            <h1>Login Page</h1>
            </div>

            <div className="container d-flex justify-content-center">

              <form onSubmit={submitHandler}>
                <div className="container mt-5">
                <div class="mb-3 ">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Username"
                    value={user.email}
                    onChange={readValue}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label" >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    value={user.password} 
                    onChange={readValue} 
                    />
                </div>
                <div className="text-center">
                <button
                  type="submit"
                  class="btn btn-primary"
                  // onClick={handleLogin}
                >
                  Submit
                </button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
}

export default LoginPage;
