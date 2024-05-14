"use client";
import { apiUrl } from "@/app/config";

export const fetchUsers = async () => {
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

  // Await the resolution of the promise returned by response.json()
  const data = await response.json();

  return data.data;
};
