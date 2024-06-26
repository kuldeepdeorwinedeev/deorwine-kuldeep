"use client";
import { apiUrl } from "@/app/config";

export const fetchUsers = async () => {
  if (typeof window !== "undefined") {
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
  }
};
export const fetchUserDetails = async (user_id) => {
  if (typeof window !== "undefined") {
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

    const response = await fetch(`${apiUrl}/admin/users/${user_id}`, options);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // Await the resolution of the promise returned by response.json()
    const data = await response.json();

    return data.data;
  }
};
