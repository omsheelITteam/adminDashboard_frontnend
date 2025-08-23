
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_URL;
// console.log(backendURL,'backendurl');

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  axios.defaults.withCredentials = true;

  const getAdminProfile = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/get-admin-profile`);
      if (data.success) {
        setUserData(data.adminData);
        // console.log(data.adminData,"Admin data");
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      setIsLoggedin(false);
    }
  };

  useEffect(() => {
    getAdminProfile(); 
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        backendURL,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
