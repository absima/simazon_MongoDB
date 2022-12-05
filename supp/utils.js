export default () => {
  const cookies = document.cookie.split(";");
  return cookies
    .find((c) => c.trim().split("=").shift() === "token")
    .trim()
    .split("=")
    .pop();
};

export const setToken = () => {
  try {
    const value = window.localStorage.getItem("token");

    if (value) {
      return JSON.parse(value);
    } else {
      window.localStorage.setItem("token", JSON.stringify(defaultValue));
      return null;
    }
  } catch (error) {
    return null;
  }
};
