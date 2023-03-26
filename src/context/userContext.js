import { useEffect, createContext, useReducer } from "react";

export const UserContext = createContext();

const initialValue = JSON.parse(localStorage.getItem("user")) || {
  user: null,
  isAuth: false,
  userInfo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    // login
    case "LOGIN":
      var data = {
        user: action.payload,
        isAuth: true,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;

    //logout
    case "LOGOUT":
      data = {
        user: null,
        isAuth: false,
        userInfo: null,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;

    //setinfo
    case "SET_USER_INFO":
      data = {
        ...state,
        userInfo: action.payload,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;

    //defaultcase
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [userData, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={[userData, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
