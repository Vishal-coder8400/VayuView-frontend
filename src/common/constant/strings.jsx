// state actions (DON'T CHANGE THESE)
export const INIT_DATA = "INIT_DATA";
export const LOG_IN = "LOGIN";
export const LOG_OUT = "LOG_OUT";
export const ADD_USER_DATA = "ADD_USER";
export const REMOVE_USER_DATA = "REMOVE_USER";
export const UPDATE_PIPELINE_DATA = "UPDATE_PIPELINE_DATA";
export const UPDATE_CONFIGURATIONS = "UPDATE_CONFIGURATIONS";
export const DELETE_PIPELINE_DATA = "DELETE_PIPELINE_DATA";
//UPTO THESE

export const ADD_INSTANCE = "ADD_INSTANCE";
export const UPDATE_INSTANCE = "UPDATE_INSTANCE";
export const UPDATE_INSTANCE_SECS = "UPDATE_INSTANCE_SECS";
export const DELETE_INSTANCE = "DELETE_INSTANCE";

export const UPDATE_CURRENT_INSTANCE = "UPDATE_CURRENT_INSTANCE";
export const UPDATE_ALL_INSTANCES = "UPDATE_ALL_INSTANCES";
export const TOGGLE_THEME = "TOGGLE_THEME";
//changeable

//changeble , for network errors
export const NETWORK_ERROR = "Network Error!";
export const SERVER_ERROR = "Internal Server Error!";

//UI

// for DASHBOARD/CANVAS errors
export const BLOCK_REPLICA_NOT_ALLOW =
  "Block Replica Is Not Allowed In The Pipeline.";
export const MULTIPLE_SOURCE_NOT_ALLOWED =
  "Multiple Sources Are Not Allowed In The Pipeline.";
export const UPDATE_PICKUP = "UPDATE_PICKUP"
// for Mp4Source Block
export const CHOOSE_FILE = "Click To Choose File";
export const ONLY_MP4_ALLOWED =
  "File format not supported. Please upload MP4 file.";
export const MAX_FILE_SIZE_LIMIT_IMAGE = "Maximum File Size Limit Is 20 MB";
export const MAX_FILE_SIZE_LIMIT = "Maximum File Size Limit Is 250 MB";
export const FILE_UPLOAD_ABORTED = "File Upload Aborted!";

// for RTSP source Block
export const RTSP_EMPTY = "Rtsp Url Is Empty!!!";
export const ONLY_RTSP_ALLOWED = "RTSP URL in not valid";

// for openEye Block
export const OPENEYE_CREDS_NOT_AVAILABLE =
  "Add OpenEye Credentials In Settings";
export const FETCHING_FORMAT_DETAILS = "Fetching Format Details...";
export const FETCHING_CAMERA_DETAILS = "Fetching Camera Details...";
export const SELECT_FORMAT = "Select A Format";
export const SELECT_CAMERA = "Select A Camera";
export const GETTING_DEVICE_INFORMATION = "Getting Device Information ...";
export const COULD_NOT_FETCH_DEVICE_INFORMATION =
  "Could Not Fetch Device Information!!!";
export const SELECT_DEVICE_TO_GET_CAMERA_DETAILS =
  "Select A Device To Get Camera Details";
export const STREAM_LINK_IN_PROGRESS = "Stream Link Creation In Progress...";
export const STREAM_LINK_GENERATED = "Saving...";

// for HTTP Source Block
export const HTTP_EMPTY = "Http Url Is Empty!!!";

// for YT URL Block
export const YT_EMPTY = "Youtube Url Is Empty!!!";

// Custom Post Process
export const CHOOSE_PY_FILE = "Click To Choose A .py File";
// export const ONLY_PY_ALLOWED = "Choose A Python File";
export const ONLY_PY_ALLOWED =
  "File format not supported. Please upload python (.py) file.";
//for Terminal
export const PIPELINE_STARTED = "Pipeline Started";
export const PIPELINE_CLOSED = "Pipeline Closed";

//terminal content
export const AUTO_SCROLL = "Enable For Autoscroll";
export const DOWNLOAD_LOGS = "Download Logs For Current Test";

export const NETWORK_ISSUE_IMG_NOT_AVAIL =
  "Network Issue Or Try Again Adding Source Block To Your Pipeline";

export const TASK_DESCRIPTION_PROCESS_BASED =
  "Use Cases Where We Want To Detect If Certain Activity Occurred Or Not. If It’s A Non-Compliance Detection, We Tag It As A Violation";

export const TASK_DESCRIPTION_COUNT_BASED =
  "Use Cases Where Number Of Detections Is The Primary Output";

export const TASK_DESCRIPTION_TIME_BASED =
  "Use Cases Where We Focus On Time Taken For A Particular Activity";

export const TASK_DESCRIPTION_OCCUPANCY_BASED =
  "Use Cases Where Average Of The Counts Detected Is The Primary Output. Applicable Where Count Detected Cannot Be Aggregated Incrementally";

export const TASK_DESCRIPTION_HEATMAP_BASED = "";

export const VERSION_MISMATCH = "Version Mismatch";

// for run pipeline errors
export const ADD_SOURCE_BLOCK = "Add Input/Source Block To Your Pipeline...";
export const NOT_CONNECTED = "Block Is Not Connected...";
export const EMPTY_PIPELINE = "Cannot Process An Empty Pipeline";

// Admin Accounts -> for publish feature
export const ADMIN_ACCOUNTS = [

];
