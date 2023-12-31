import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import styles from "./style";
import Blogs from "./components/Blogs";
import Navbar from "./components/Navbar";
import Events from "./components/Events";
import TechSpardha from "./components/TechSpardha";
import Drone from "./components/AboutUs";
import BlogPost from "./Blog/BlogPost";
import BlogTemp from "./Blog/BlogTemp";
import Auth from "./auth/auth";
import Logoutcontrol from "./auth/logoutcontrol";
import { useState, useEffect } from "react";
import AboutUs from "./components/AboutUs";
import Admin from "./components/Admin";
import TeamSignup from "./components/registerForm/TeamSignup";
import Signup from "./components/registerForm/Signup";
import Teams from "./Teams/Teams";
import Partners from "./components/Partners/partners";

const HomePage = () => {
  const [islogin, setisLogin] = useState(0);
  const [isadmin, setisAdmin] = useState(false);
  const [user, setUser] = useState("");
  // var user="jay ";
  // checkCookie();
  function setStateisLogin(val) {
    setisLogin(val);
  }

  useEffect(() => {
    checkCookie();
  }, []);
  function checkCookie() {
    console.log("check cookie runnig");
    setUser(accessCookie("user"));
    console.log(user);
    if (user !== "") {
      console.log("cookie found");
      setisLogin(1);
      document.getElementsByClassName("navvalues")[5].innerHTML = "logout";
    } else {
      console.log("Not Found");
      setisLogin(0);
      document.getElementsByClassName("navvalues")[5].innerHTML = "login";
    }
    //delete cookie
    // document.cookie = "user=''; expires=Thu, 18 Dec 2013 12:00:00 UTC";
  }

  function accessCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  return (
    <BrowserRouter>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar isLogin={islogin} isadmin={!isadmin} setisAdmin={setisAdmin}/>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Events />} />
          <Route path="/techspardha" element={<TechSpardha />} />
          <Route path="/admin" element={<Admin user={user} />} />
          <Route path="/team" element={<Teams />} />
          <Route path="/partners" element={<Partners />} />
          {/* <Route path='/drone' element={<BlogTemp />}/> */}
          <Route
            path="/drone"
            element={
              islogin ? (
                <Drone />
              ) : (
                <Auth isLogin={islogin} setLogin={checkCookie} />
              )
            }
          />
          {/* <Route path="/drone" element={<Auth  />} /> */}
          <Route
            path="/authenticate"
            element={
              !islogin ? (
                <Auth isLogin={islogin} setLogin={checkCookie} />
              ) : (
                <Logoutcontrol setLogin={checkCookie} />
              )
            }
          />

          <Route
            path="/register/:id"
            element={
              islogin ? (
                <Signup />
              ) : (
                <Auth isLogin={islogin} setLogin={checkCookie} />
              )
            }
          />
          <Route path="/api/blogposts/:id" element={<BlogPost />} />
          {/* <Route path='/hover' element={<HoverCanvas/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default HomePage;
