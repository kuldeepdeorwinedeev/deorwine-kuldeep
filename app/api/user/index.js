import { apiUrl } from "@/app/config";
async function signUpUser(user) {
  console.log(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/user/signup`, options);
  const data = await response.json();
  return data;
}
async function signInUser(user) {
  console.log(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/user/signin`, options);
  const data = await response.json();
  return data;
}
async function userForgotPassword(user) {
  console.log(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/user/forgot-password`, options);
  const data = await response.json();
  return data;
}
async function userResetPassword(user) {
  console.log(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/user/reset-password`, options);
  const data = await response.json();
  return data;
}
export { signUpUser, signInUser, userForgotPassword, userResetPassword };
