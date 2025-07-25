/* LIBRARIES */
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";

/**
 * @param {String} data message to display
 * shows the error alert
 */
const Error = (data) => {
  if (isEmpty(data)) {
    return;
  }
  
  toast.error(data);
};

export default Error;
