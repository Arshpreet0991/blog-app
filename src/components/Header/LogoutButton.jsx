import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/appwrite/auth.js";
import { logout } from "../../features/authSlice/authSlice.js";

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // logout from backend
    authService.logout().then(() => {
      dispatch(logout()); // logout from slice to update state
    });
  };

  return (
    <div>
      <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
