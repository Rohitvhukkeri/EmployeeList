import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useAuth(token) {
  const [user, setUser] = useState(null);
  console.log("ooooo",user)
  const [isLogged, setIsLogged] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //cart state
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const readAllUsers = async () => {
    const userList = await axios.get(
      `http://localhost:4000/api/v1/auth/allUsers`
      //   {
      //     headers: { Authorization: token },
      //   }
    );
    console.log("user>>>>", userList);
    setAllUsers(userList.data.users);
  };

  useEffect(() => {
    if (token) {
      const getData = async () => {
        const res = await axios.get(`/api/v1/auth/userinfo`, {
          headers: { Authorization: token },
        });
        console.log("token =", token);
        setUser(res.data.user);
        setIsLogged(true);
        if (res.data.user.role === "superadmin") {
          setIsAdmin(true);
          readAllUsers();
        }
        if (res.data.user.role === "user") {
          setIsUser(true);
          readAllUsers();
        }
        if (res.data.user) {
          readAllUsers();
        }
      };

      getData();
    }
  }, [token]);

  return {
    userData: [user, setUser],
    isLogged: [isLogged, setIsLogged],
    isUser: [isUser, setIsUser],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
    allUsers: [allUsers, setAllUsers],
  };
}

export default useAuth;
