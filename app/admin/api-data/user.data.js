// UserProvider.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "@/app/config";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchUsers = async () => {
        try {
          const token = window.localStorage.getItem("token");
          const headers = {
            token: token,
            "Content-Type": "application/json",
            accept: "application/json",
          };

          const options = {
            method: "GET",
            headers: headers,
          };

          const response = await fetch(`${apiUrl}/admin/users`, options);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setUsersData(data.data);
        } catch (error) {
          console.error("Error fetching users:", error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }
  }, []);

  return (
    <UserContext.Provider value={{ usersData, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};
