import React, { useContext } from "react";
import "./auth.css";

import { auth, db } from "./../../firebase";
import { useNavigate } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";

import { UserContext } from "../../context/userContext";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import signUpLogo from "./../../Assects/signUpWIthGoogle.jpg";

const Auth = ({ userType }) => {
  const provider = new GoogleAuthProvider();
  const [userData, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const redirectUser = async (email) => {
    //IF USER IS CANDIDATE
    let u = await getDoc(doc(db, "users", email));
    let userInfoFromDB = null;
    if (u.exists()) {
      userInfoFromDB = u.data();
    }

    if (userType === "candidate") {
      // IF USER EXISTS IN OUR DATABASE
      if (userInfoFromDB) {
        //if in the databse usertype is candidate then only redirect to candidate profile

        if (userInfoFromDB.userType === "candidate") {
          dispatch({
            type: "SET_USER_INFO",
            payload: userInfoFromDB,
          });
          navigate("/candidate/profile");
        }

        //else show error this id is already registered as employer
        else {
          alert("this id is already registered as employer");
          return;
        }
      }

      //IF USER IS NOT EXIST IN OUR DATABASE
      else {
        navigate("/candidate/onboarding");
      }
    }

    //IF USER IS EMPLOYER
    else {
      // IF USER EXISTS IN OUR DATABASE
      if (userInfoFromDB) {
        //if in the databse usertype is employer then only redirect to employer profile

        if (userInfoFromDB.userType === "employer") {
          dispatch({
            type: "SET_USER_INFO",
            payload: userInfoFromDB,
          });
          navigate("/employer/profile");
        }

        //else show error this id is already registered as candidate
        else {
          alert("this id is already registered as candidate");
          return;
        }
      }

      //IF USER IS NOT EXIST IN OUR DATABASE
      else {
        navigate("/employer/onboarding");
      }
    }
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        const { displayName, email, photoURL } = user;

        dispatch({
          type: "LOGIN",
          payload: { displayName, email, photoURL },
        });
        redirectUser(email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="authContainer">
      <h1>Welcome {userType}</h1>
      <h3>Sign In</h3>
      <button onClick={signIn}>
        <img src={signUpLogo}></img>
      </button>
    </div>
  );
};

export default Auth;
