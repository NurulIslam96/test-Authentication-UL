import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="navbar bg-blue-50 flex justify-between">
      <div>
        <Link to={"/"} className="btn btn-outline normal-case text-xl">
          Test-UnioLabs
        </Link>
      </div>
      {!user?.email && (
        <div className="flex gap-2">
          <Link to={"/register"}>
            <button className="btn">Register</button>
          </Link>
          <Link to={"/login"}>
            <button className="btn">Login</button>
          </Link>
        </div>
      )}
      {user?.emailVerified && (
        <>
          <div className="flex gap-2">
            <Link to={"/user"}>
              <button className="btn">User Info</button>
            </Link>
          </div>
        </>
      )}
      {user?.emailVerified && (
        <div className="flex gap-2">
          <button className="btn btn-primary">{user?.displayName}</button>
          <button className="btn btn-warning" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
