import React from "react";
import { NavLink } from "react-router-dom";
import Image1 from '../component/Image/Image1.png'

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container ">
          <div className="">
            <a class="navbar-brand" href="#">
            </a>
            <img src={Image1} class=""  alt="..." width={"140px"} height={"75px"}></img>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse d-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mb-2 mb-lg-0">
              
              <li class="nav-item">
                <NavLink to={"/home"} className="nav-link active">
                 Home
                </NavLink>
              </li>
              <li class="nav-item ">
              <NavLink to={"/list"} className="nav-link active">
                 Employee List
                </NavLink>
              </li>
            
             
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Sachin
                </a>
              </li>
              <li class="nav-item">
              <NavLink to={"/login"} className="nav-link active">
                 Logout
                </NavLink>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
