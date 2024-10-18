"use client";
import { useAuth } from "@/contexts/AuthProvider";
import BreadCrumb from "./BreadCrumb";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false); // State to track menu visibility

  useEffect(() => {}, [currentUser]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  if (currentUser) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <BreadCrumb />
        </div>
        <div className="relative">
          {/* Avatar */}
          <div className="avatar cursor-pointer" onClick={toggleMenu}>
            <div className="w-8 rounded-full">
              <img
                src={currentUser.photoURL || "/default-avatar.png"}
                alt="User Avatar"
              />
            </div>
          </div>

          {/* Dropdown menu */}
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-gray-100 p-2 space-y-2">
              <ul className="menu rounded-box w-full p-2 bg-gray-100 space-y-2">
                <li>
                  <button
                    onClick={logout}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Sign out
                  </button>
                </li>
                <li>
                  <button className="btn btn-xs btn-disabled btn-outline">
                    See profile
                  </button>
                </li>
                {/* Add more menu items if needed */}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
