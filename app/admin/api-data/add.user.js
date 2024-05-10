import { apiUrl } from "@/app/config";

export const addUsers = async (user) => {
  console.log(user);
  try {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      const headers = {
        token: `${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user),
      };

      const response = await fetch(`${apiUrl}/admin/users/add`, options);
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    }
  } catch (error) {
    throw error;
  }
};
