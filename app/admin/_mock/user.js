import { sample } from "lodash";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "@/app/config";

// Fetch users data from the API
const fetchUsers = async () => {
  if (typeof window !== undefined) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      accept: "application/json",
    };

    const options = {
      method: "GET", // or any other HTTP method you are using
      headers: headers,
    };

    const response = await fetch(`${apiUrl}/users`, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }
};
// Process user data when it's loaded
const processUserData = (userData) => {
  return userData?.map((_, index) => ({
    id: userData.user_id,
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: userData.username,
    company: userData.company,
    isVerified: faker.datatype.boolean(),
    status: sample(["active", "banned"]),
    role: sample([
      "Leader",
      "Hr Manager",
      "UI Designer",
      "UX Designer",
      "UI/UX Designer",
      "Project Manager",
      "Backend Developer",
      "Full Stack Designer",
      "Front End Developer",
      "Full Stack Developer",
    ]),
  }));
};

// Component where you fetch and process user data
const users = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery("users", fetchUsers, {
    enabled: false,
  });
  console.log(userData);
  const user = processUserData(userData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return user;
};

export { users };
