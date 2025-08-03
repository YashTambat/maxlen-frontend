// import React, { createContext, useContext, useState ,useEffect} from "react";
// // Create the context
// const AuthContext = createContext();
// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       setIsLoggedIn(true);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//     localStorage.setItem("userData", JSON.stringify(userData));
//     localStorage.setItem("accessToken", userData.accessToken);
//     localStorage.setItem("refreshToken", userData.refreshToken);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     localStorage.removeItem("userData");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };


















// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create the context
// const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [roleName, setRoleName] = useState("Role not found"); // Default role
 

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setIsLoggedIn(true);
//       setUser(parsedUser);
//       setRoleName(parsedUser.view?.roleViews?.[0]?.name || "Role not found"); // Extract role name
//     }
//   }, []);

//   const login = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//     setRoleName(userData.view?.roleViews?.[0]?.name || "Role not found"); // Set role on login
//     localStorage.setItem("userData", userData.user);
//     localStorage.setItem("accessToken", userData.accessToken);
//     // localStorage.setItem("refreshToken", userData.refreshToken);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     setRoleName("Role not found"); // Reset role on logout
//     localStorage.removeItem("userData");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   };


//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, roleName, login, logout}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };






















import React, { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [roleName, setRoleName] = useState("Role not found"); // Default role

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
     console.log("storedUser User:", storedUser);
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed User:", parsedUser);
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      setRoleName(parsedUser?.role || "Role not found"); // Extract role 
    }
  }, []);

  const login = ({ user, token }) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
     setRoleName("Role not found");
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user,roleName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);