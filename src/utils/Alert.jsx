/* LIBRARIES */
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";

/**
 * @param {String} data message to display
 * return an alert with the message
 */
const Alert = (data) => {
  if (isEmpty(data)) {
    return;
  }
  toast.success(data);
};
export default Alert;
