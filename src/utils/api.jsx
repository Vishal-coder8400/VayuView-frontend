/* LIBRARIES */
import axios from "axios";
import { has, isEmpty } from "lodash";

/* ABSOLUTE IMPORTS */
import { SERVER_ERROR } from "../common/constant/strings";
import { getBaseURL } from "../common/constant/urls";
import Alert from "./Alert";
import Error from "./Error";
import { store } from "../store";

/**
 * Universal API Caller
 */
export const callApi = ({
  method = "GET",
  url = null,
  endpoint = "",
  type = "json",
  headers = {},
  data = {},
  additionalProps = {},
  alert = false,
} = {}) => {
  return new Promise((resolve, reject) => {
    // Get token from Redux store
    const token = store.getState()?.auth?.token;

    // Log token for debugging
    if (token) console.log("TOKEN:", token);

    // Define headers based on type
    const headerTypes = {
      json: { "Content-Type": "application/json" },
      formdata: { "Content-Type": "multipart/form-data" },
    };

    const baseHeaders = {
      ...headerTypes[type],
      ...headers,
    };

    // Add Authorization header if token available
    if (!has(headers, "Authorization") && token) {
      baseHeaders.Authorization = "Bearer " + token;
    }

    // Normalize baseURL and endpoint to avoid duplicate slashes
    const baseURL = getBaseURL().replace(/\/+$/, ""); // remove trailing slash if any
    const cleanEndpoint = endpoint.replace(/^\/+/, ""); // remove leading slash if any

    // Build final URL
    const finalURL = url ? url : `${baseURL}/${cleanEndpoint}`;

    // Axios Config
    const config = {
      method: method.toUpperCase(),
      url: finalURL,
      headers: baseHeaders,
      data,
      ...additionalProps,
    };

    console.log("📡 API Request Config:", config);

    // Make API call
    axios(config)
      .then((res) => {
        if (alert && res.data.message) Alert(res.data.message);
        resolve(res.data.data);
      })
      .catch((err) => {
        const response = err?.response;

        console.error("❌ callApi error:", err);

        if (response?.status === 404 && alert) {
          Error(response.data?.message || "Connect to internet or login again");
          return reject(err);
        }

        if (has(additionalProps, "cancelToken") && axios.isCancel(err)) {
          if (alert) Error(err.message);
          return reject(err);
        }

        if (response?.status === 500) {
          if (alert) Error(response.data?.message || err.toString());
          return reject(err);
        }

        if (response?.data?.message && alert) {
          Error(response.data.message);
        }

        if (!response || isEmpty(response)) {
          if (alert) {
            const fallback =
              err.code === "ECONNABORTED"
                ? err.message
                : `${SERVER_ERROR}: ${response?.data?.message || ""}`;
            Error(fallback);
          }
        }

        reject(response?.data?.error || err);
      });
  });
};
