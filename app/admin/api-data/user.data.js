"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "@/app/config";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usersData, setUsersData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = torage.getItem("token");
      const headers = {
        token: `${token}`,
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
      let userdata = data.data;
      setUsersData(userdata);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ usersData, isLoading, isError, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
