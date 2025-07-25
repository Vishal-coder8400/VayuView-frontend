/**
 * @returns if the user login bypass is true or not
 */
export const isLoginByPass = () => {
  // eslint-disable-next-line eqeqeq
  return process.env.REACT_APP_LOGIN_BYPASS == "true";
};

/**
 * @returns if the debug mode is true or not
 */
export const isDebugMode = () => {
  return process.env.REACT_APP_DEBUG === "true";
};

/**
 * @returns the base URL
 */
/**
 * @returns the base URL for API calls
 */
/**
 * @returns the base URL for API calls
 */
/**
 * @returns the base URL (e.g. http://localhost:4000)
 */
export const getBaseURL = () => {
  const ip = process.env.REACT_APP_IP || "http://localhost";
  const port = process.env.REACT_APP_PORT || "4000";

  // Remove trailing slash from IP if any (to avoid // in URL)
  const trimmedIP = ip.endsWith("/") ? ip.slice(0, -1) : ip;

  // If port already includes colon, just use it, else add colon
  const portPart = port.startsWith(":") ? port : `:${port}`;

  return `${trimmedIP}${portPart}`;
};
