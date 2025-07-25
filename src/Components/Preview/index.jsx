import React, { useEffect, useRef, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { callApi } from "../../utils/api";
import { stateConnected } from "../../utils/redux_tools";
import zIndex from "@mui/material/styles/zIndex";
import './style.css'
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import MinusIcon from "../Creator/creator/icons/MinusIcon";
import AddIcon from "../Creator/creator/icons/AddIcon";
import HandIcon from "../Creator/creator/icons/HandIcon";
import ResetIcon from "../Creator/creator/icons/ResetIcon";
const osName = "";
const Preview = (props) => {
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const { id } = useParams();
  const navigate = useNavigate();

  const instancesRef = useRef(props.instances);

  const [canvasImage, setCanvasImage] = useState(null);
  const getCanvasImageSrc = () => {
    if (editor?.canvas) {
      const canvas = editor.canvas;
      return canvas.toDataURL({
        format: "png", // You can also use "jpeg" if preferred
        quality: 1, // Adjust quality if needed
      });
    }
    return null;
  };
  useEffect(() => {
    // Update the instances ref whenever props.instances changes
    instancesRef.current = props.instances;
    console.log('props.instances, INSTANCES', props.instances)
  }, [props.instances]);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const getHeight = (height) => {
    const dpr = window.devicePixelRatio;
    const cssHeight = height / dpr;

    const availableHeight = Math.min(window.innerHeight, cssHeight);
    return availableHeight;
  };
  const getWidth = (width) => {
    const dpr = window.devicePixelRatio;
    const cssWidth = width / dpr; // Adjusted for Retina scaling

    // Ensure it fits within the available viewport
    const availableWidth = Math.min(window.innerWidth, cssWidth);
    return availableWidth;
  };
  const calculateDimensions = (height, width) => {
    const dpr = window.devicePixelRatio;
    const cssWidth = width / dpr; // Adjusted for Retina scaling
    const cssHeight = height / dpr;

    // Ensure it fits within the available viewport
    const availableWidth = Math.min(window.innerWidth, cssWidth);
    const availableHeight = Math.min(window.innerHeight, cssHeight);

    setDimensions({
      width: availableWidth,
      height: availableHeight,
    });
  };
  console.log(dimensions, "DIMENSIONS");
  const countRef = React.useRef(0);
  const [toggle, setToggle] = useState(false);
  const [aws_id, setAws_Id] = useState("");
  const [aws_d, setAws_d] = useState("");
  const [currTime, setCurrTime] = useState("");

  const awsIntervalRef = useRef(null);
  const updateDataIntervalRef = useRef(null);

  const [timeMode, setTimeMode] = useState(getTimeUpdates());

  function getTimeUpdates() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    if (
      (currentHour === 18 && currentMinutes >= 30) ||
      currentHour > 18 ||
      currentHour < 6
    ) {
      return "NIGHT";
    } else {
      return "MORNING";
    }
  }

  // Function to get the value of a specific parameter
  function getParameterValue(data, param) {
    try {
      if (!data || typeof data === "string" || data === undefined) {
        console.log("sadfs returing 0");
        return "0";
      }
      if (isEmpty(data)) {
        return "0";
      }
      // console.log('sadfs',data, 'DATADATADATADATA')
      const entry = data[0].indoor_air_quality.find(
        (item) => item.param === param
      );
      // console.log('sadfs-entry',entry,param, 'DATADATADATADATA')
      if (entry) {
        if (!entry?.value) {
          console.log(
            "shayad yahan p DATADATADATADATA NO VALUE",
            entry,
            entry.value,
            !entry?.value
          );
          return "0";
        }
        return parseFloat(entry.value).toFixed(0).toString() + " " + entry.unit;
        return { value: entry.value, unit: entry.unit };
      } else {
        return "0"; // Parameter not found
      }
    } catch (e) {
      console.log("shayad yahan p DATADATADATADATA");
      return "0";
    }
  }
  const getAllData = async (e) => {
    await callApi({
      endpoint: `api/Dashboard/${id.split("=")[1]}`,
    })
      .then((res) => {
        setAws_Id(res?.aws);
        console.log(res.aws);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 10000 * res?.template?.length || 1);
        props?._updateAllInstances([]);
        setTimeout(() => {
          props._updateAllInstances(res.template);
          console.log(res.template.length, 'res.template')

          console.log("🚀 ~ setTimeout ~ res.template:", res.template);
          if (props.instances[props.currentInstance]?.data) {
            editor?.canvas?.loadFromJSON({
              objects: props?.instances?.[props.currentInstance].data,
            });
            console.log(
              getWidth(props?.instances?.[props.currentInstance].width)
            );
            console.log(
              getHeight(props?.instances?.[props.currentInstance].height)
            );
            editor?.canvas?.renderAll();
            editor?.canvas?.setDimensions({
              width: props?.instances?.[props.currentInstance].width,
              height: props?.instances?.[props.currentInstance].height,
            });
            // calculateDimensions(
            //   props?.instances?.[props.currentInstance].height,
            //   props?.instances?.[props.currentInstance].width
            // );
            setTimeout(() => {
              editor?.canvas?.renderAll();
            }, 500);
          }
          // const oneHourInMilliseconds = 60 * 60 * 1000;
          const oneHourInMilliseconds = 60 * 180 * 1000;
          setTimeout(() => {
            window.location.reload();
          }, oneHourInMilliseconds);
          (async () => {
            await callApi({
              endpoint: `aqi-last-log`,
            })
              .then((res) => {
                console.log(res, "RES");
                setAws_d(res.data);
                if (instancesRef.current[props.currentInstance]?.data) {
                  editor?.canvas?.loadFromJSON({
                    objects: instancesRef.current?.[props.currentInstance].data,
                  });
                  editor?.canvas?.renderAll();
                  editor?.canvas?.setDimensions({
                    width: props?.instances?.[props.currentInstance].width,
                    height: props?.instances?.[props.currentInstance].height,
                  });
                  // calculateDimensions(
                  //   instancesRef.current?.[props.currentInstance].height,
                  //   instancesRef.current?.[props.currentInstance].width
                  // );
                  setTimeout(() => {
                    editor?.canvas?.renderAll();
                  }, 500);
                }
              })
              .catch((err) => {});
          })();
          awsIntervalRef.current = setInterval(() => {
            (async () => {
              await callApi({
                endpoint: `aqi-last-log`,
              })
                .then((res) => {
                  console.log(res, "RES");
                  setAws_d(res.data);
                  if (instancesRef.current[props.currentInstance]?.data) {
                    editor?.canvas?.loadFromJSON({
                      objects:
                        instancesRef.current?.[props.currentInstance].data,
                    });
                    editor?.canvas?.renderAll();
                    editor?.canvas?.setDimensions({
                      width: props?.instances?.[props.currentInstance].width,
                      height: props?.instances?.[props.currentInstance].height,
                    });
                    // calculateDimensions(
                    //   instancesRef.current?.[props.currentInstance].height,
                    //   instancesRef.current?.[props.currentInstance].width
                    // );
                    setTimeout(() => {
                      editor?.canvas?.renderAll();
                    }, 500);
                  }
                })
                .catch((err) => {});
            })();
          }, 60000);
          updateDataIntervalRef.current = setInterval(() => {
            (async () => {
              await getUpdatedData().then((res) => {});
            })();
          }, 105000);
        }, 1000);
      })
      .catch((err) => {
        console.log("SETTING AWS UPDATEdddd");
        updateDataIntervalRef.current = setInterval(() => {
          (async () => {
            await getUpdatedData().then((res) => {});
          })();
        }, 105000);
      });
  };

  const getUpdatedData = async (e) => {
    console.log("SETTING AWS UPDATE");
    await callApi({
      endpoint: `api/Dashboard/${id.split("=")[1]}`,
    })
      .then((res) => {
        setTimeout(() => {
          props._updateAllInstances(res.template);
          if (res.time) {
            setCurrTime(res.time);
          } else {
            setCurrTime(new Date());
          }
          if (!awsIntervalRef.current) {
            awsIntervalRef.current = setInterval(() => {
              (async () => {
                await callApi({
                  endpoint: `aqi-last-log`,
                })
                  .then((res) => {
                    console.log(res, "RES_AQI");
                    setAws_d(res.data);
                    if (instancesRef.current[props.currentInstance]?.data) {
                      editor?.canvas?.loadFromJSON({
                        objects:
                          instancesRef.current?.[props.currentInstance].data,
                      });
                      editor?.canvas?.renderAll();
                      editor?.canvas?.setDimensions({
                        width: props?.instances?.[props.currentInstance].width,
                        height: props?.instances?.[props.currentInstance].height,
                      });
                      // calculateDimensions(
                      //   instancesRef.current?.[props.currentInstance].height,
                      //   instancesRef.current?.[props.currentInstance].width
                      // );
                      setTimeout(() => {
                        editor?.canvas?.renderAll();
                      }, 500);
                    }
                  })
                  .catch((err) => {});
              })();
            }, 65000);
          }
          if (instancesRef.current[props.currentInstance]?.data) {
            editor?.canvas?.loadFromJSON({
              objects: props?.instances?.[props.currentInstance].data,
            });
            editor?.canvas?.renderAll();
            setTimeout(() => {
              editor?.canvas?.renderAll();
            }, 500);
          }
        }, 1000);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    (async () => {
      props._updateCurrentInstance(0);
      getAllData();
    })();

    let interval = setInterval(() => {
      // Retrieve the current count value from the ref
      let count = countRef.current;
      console.log('🚀 ~ interval ~ count: working nnnnaaaa')
      setToggle((prev) => !prev); // toggle this to hit the load data json function

      console.log(
        "🚀 ~ interval ~ props.instances.length:",
        props.instances.length,
        props.instances,
        instancesRef.current
      );
      console.log("🚀 ~ interval ~ count:", count);
      if (count >= instancesRef.current.length - 1) {
        // Reset count if it exceeds the array length
        count = 0;
      } else {
        // Increment count if it's within the array length
        count += 1;
      }

      // Update the ref with the new count value
      countRef.current = count;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helps to load the the data on every Interval
  useEffect(() => {
    if (countRef) {
      LoadDataFromJson(countRef.current);
    }
  }, [countRef]);

  useEffect(() => {
    let timeInterval = setInterval(() => {
      let mode = getTimeUpdates();
      if (mode !== timeMode) {
        setTimeMode(mode);
      }
    }, 60 * 1000);

    return () => {
      clearInterval(timeInterval);
      if (awsIntervalRef.current) {
        clearInterval(awsIntervalRef.current);
      }
      if (updateDataIntervalRef.current) {
        clearInterval(updateDataIntervalRef.current);
      }
    };
  }, []);

  function containsAbbreviatedMonth(text) {
    if (!text) {
      return false;
    }
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const lowerText = text.toLowerCase();
    return months.some((month) => lowerText.includes(month));
  }

  const AQI_LEVELS = [
    {
      max: 50,
      color: "green",
      label: "Good",
      src: "http://3.108.95.4:5090/default/indoor_good.png",
    },
    {
      max: 100,
      color: "yellow",
      label: "Moderate",
      src: "http://3.108.95.4:5090/default/indoor_moderate.png",
    },
    {
      max: 150,
      color: "orange",
      label: "Unhealthy for Sensitive Groups",
      src: "http://3.108.95.4:5090/default/indoor_moderate.png",
    },
    {
      max: 200,
      color: "red",
      label: "Unhealthy",
      src: "http://3.108.95.4:5090/default/indoor_extreme.png",
    },
    {
      max: 300,
      color: "purple",
      label: "Very Unhealthy",
      src: "http://3.108.95.4:5090/default/indoor_extreme.png",
    },
    {
      max: Infinity,
      color: "maroon",
      label: "Hazardous",
      src: "http://3.108.95.4:5090/default/indoor_extreme.png",
    },
  ];

  const [disablePanMode, setDisablePanMode] = useState(true);

  const [togglefirstTime, setTogglefirstTime] = useState(false); // helps to load the data on the refresh

  function getAQIColor(aqi) {
    return AQI_LEVELS.find((level) => aqi <= level.max);
  }
  
  const rangeMapping = {
    sensor_id: [
      { min: 70, max: 100, color: "#f94144" },
      { min: 60, max: 70, color: "#ffbf06" },
      { min: 30, max: 60, color: "#90be6d" },
      { min: 25, max: 30, color: "#ffbf06" },
      { min: 0, max: 30, color: "#f94144" },
    ],
    "pm2.5": [
      { min: 0.0, max: 12.0, color: "#90be6d" },
      { min: 12.1, max: 35.4, color: "#f8961e" },
      { min: 35.5, max: 55.4, color: "#f3722c" },
      { min: 55.5, max: 150.4, color: "#ee0b00" },
      { min: 150.5, max: 250.4, color: "#560bad" },
      { min: 250.5, max: 400, color: "#472d30" },
    ],
    temp: [
      { min: 0.0, max: 12.0, color: "#90be6d" },
      { min: 12.1, max: 35.4, color: "#f8961e" },
      { min: 35.5, max: 55.4, color: "#f3722c" },
      { min: 55.5, max: 150.4, color: "#ee0b00" },
      { min: 150.5, max: 250.4, color: "#560bad" },
      { min: 250.5, max: 400, color: "#472d30" },
    ],
    "pm10.0": [
      { min: 0, max: 54, color: "#90be6d" },
      { min: 55, max: 154, color: "#f8961e" },
      { min: 155, max: 254, color: "#f3722c" },
      { min: 255, max: 354, color: "#ee0b00" },
      { min: 355, max: 424, color: "#560bad" },
      { min: 425, max: 500, color: "#472d30" },
    ],
    co2: [
      { min: 400, max: 699, color: "#90be6d" },
      { min: 700, max: 1099, color: "#f8961e" },
      { min: 1100, max: 1599, color: "#f3722c" },
      { min: 1600, max: 2099, color: "#ee0b00" },
      { min: 2100, max: 2500, color: "#472d30" },
    ],
    tvoc: [
      { min: 0, max: 65, color: "#90be6d" },
      { min: 65, max: 220, color: "#f8961e" },
      { min: 220, max: 660, color: "#f3722c" },
      { min: 660, max: 2200, color: "#ee0b00" },
      { min: 2200, max: 5500, color: "#472d30" },
    ],
    hcho: [
      { min: 0.0, max: 0.1, color: "#90be6d" },
      { min: 0.1, max: 1, color: "#472d30" },
    ],
    co: [{ min: 0, max: 9999, color: "#90be6d" }],
    ozone: [{ min: 0, max: 9999, color: "#90be6d" }],
    no2: [{ min: 0, max: 9999, color: "#90be6d" }],
    humidity: [
      { min: 30, max: 59, color: "#90be6d" },
      { min: 25, max: 29, color: "#f8961e" },
      { min: 60, max: 69, color: "#f8961e" },
      { min: 70, max: 100, color: "#ee0b00" },
      { min: 0, max: 24, color: "#ee0b00" },
    ],
  };

  const [scaleFactor, setScaleFactor] = useState(1); // Track canvas scaling
  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    if (editor?.canvas) {
      const canvas = editor.canvas;

      // Calculate new scale factors
      const widthScale = newWidth / dimensions.width;
      const heightScale = newHeight / dimensions.height;
      const newScaleFactor = Math.min(widthScale, heightScale);

      // Update canvas dimensions

      // Scale objects on the canvas
      const widthRatio = newWidth / dimensions.width;
      const heightRatio = newHeight / dimensions.height;

      // Resize each object based on the new canvas size
      canvas.getObjects().forEach((obj) => {
        // Update width and height
        obj.width = (obj.width || 0) * widthRatio;
        obj.height = (obj.height || 0) * heightRatio;

        // Update positions (left and top)
        obj.left = (obj.left || 0) * widthRatio;
        obj.top = (obj.top || 0) * heightRatio;

        obj.setCoords(); // Update coordinates
      });
      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);

      canvas.renderAll(); // Redraw canvas
      setScaleFactor(newScaleFactor); // Update scaling state
    }

    setDimensions({ width: newWidth, height: newHeight });
  };
  const captureCanvasAsImage = () => {
    if (editor?.canvas) {
      const canvas = editor.canvas;

      // Export current canvas state as an image (base64)
      const dataURL = canvas.toDataURL({
        format: "png", // You can also use "jpeg" if preferred
        quality: 1, // Adjust quality if needed
      });

      // Set the base64 image to the state
      setCanvasImage(dataURL);
    }
  };
  // Function to get color for a parameter and value
  function getColorForParam(param, value) {
    try {
      const ranges = rangeMapping[param];
      if (!ranges) {
        return "#000"; // Default color if param not found
      }

      // Find the correct range for the value
      const range = ranges.find(
        (range) => value >= range.min && value <= range.max
      );

      return range ? range.color : "#000"; // Default color if value is out of range
    } catch (e) {
      return "0";
    }
  }
  function containsAbbreviatedTime(text) {
    if (!text) {
      return false;
    }
    const months = ["am", "pm"];
    const lowerText = text.toLowerCase();
    return months.some((month) => lowerText.includes(month));
  }

  function containsAbbreviatedAQI(text) {
    if (!text) {
      return false;
    }
    const months = ["AQI", "aqi"];
    const lowerText = text.toLowerCase();
    return months.some((month) => lowerText.includes(month));
  }
  function calculateAQI(pm25) {
    // Define the breakpoints and AQI ranges for PM2.5
    const breakpoints = [
      { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
      { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
      { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
      { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
      { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
      { cLow: 250.5, cHigh: 500.4, iLow: 301, iHigh: 500 },
    ];

    // Find the appropriate breakpoint range
    const range = breakpoints.find((b) => pm25 >= b.cLow && pm25 <= b.cHigh);

    if (!range) {
      return "- AQI";
      throw new Error("PM2.5 value out of range for AQI calculation.");
    }

    // Apply the AQI formula
    const { cLow, cHigh, iLow, iHigh } = range;
    const aqi = ((iHigh - iLow) / (cHigh - cLow)) * (pm25 - cLow) + iLow;

    return Math.round(aqi) + " AQI"; // Return the rounded AQI value
  }

  const parentRef = useRef();
  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  }
  const [height, setHeight] = useState(1080);

  const [width, setWidth] = useState(1920);
  function containsAbbreviatedGreeting(text) {
    if (!text) {
      return false;
    }
    const months = [
      "Good Morning",
      "Good Afternoon",
      "Good Evening",
      "Good Night",
    ];
    // const lowerText = text.toLowerCase();
    return months.some((month) => text.includes(month));
  }
  const LoadDataFromJson = (index) => {
    console.log("going inside......");
    if (props.instances[index]?.data) {
      editor?.canvas?.clear();
      //   editor?.canvas?.set(props.instances[index]?.data);
      let d = props?.instances?.[index].data;
      console.log(d, aws_d, "data...");
      let final_d = [];
      d.forEach((element) => {
        console.log("ELEMENT CALLING", element);
        console.log(element?.text, element.type, "CALCULATEAQI");
        if (element.type === "group") {
          let el_ = element;
          console.log(el_, "ELEMENTTHAT");
          let param = el_.objects[2].text.toLowerCase();
          console.log(
            "DATADATADATADATA ---- VALUE",
            aws_d,
            param,
            getParameterValue(aws_d, param)
          );
          el_.objects[1].text = getParameterValue(aws_d, param);
          // let { color, label } = getAQIColor(parseFloat(getParameterValue(aws_d, param)));
          let color_ = getColorForParam(
            param,
            parseFloat(getParameterValue(aws_d, param))
          );

          el_.objects[0].stroke = color_;
          el_.objects[1].fill = color_;
          el_.objects[2].fill = color_;
          console.log(el_, "ELEMENT COLOR CHANGING...");
          final_d.push(el_);
        } else if (
          element.type === "image" &&
          element?.src?.includes("/default/")
        ) {
          // const pm25Data = aws_d?.indoor_air_quality?.find(item => item.param === "pm2.5");
          // const pm25Data = aws_d[0]?.indoor_air_quality?.find(item => item.param === "humidity");
          let el_ = element;
          const pm25Data = aws_d[0]?.indoor_air_quality?.find(
            (item) => item.param === "humidity"
          );
          // console.log('CALCULATEAQI', aws_d, pm25Data, aws_d[0]?.indoor_air_quality)
          // el_.text = calculateAQI(pm25Data?.['value']);
          // try{
          //   console.log(getAQIColor(parseInt(calculateAQI(pm25Data?.['value']).split(' ')[0])).color, 'getAQIColor(calculateAQI(pm25Data[value])) inside try...')
          // }catch(err){
          //   console.log(err,'getAQIColor(calculateAQI(pm25Data[value]))')
          // }
          if (pm25Data?.["value"])
            el_.src = getAQIColor(
              parseInt(calculateAQI(pm25Data?.["value"]).split(" ")[0])
            )?.src;
          final_d.push(el_);
        } else if (element.type === "text") {
          if (isEmpty(element.text)) {
            return;
          }
          console.log(
            aws_d,
            element?.text,
            containsAbbreviatedGreeting(element?.text),
            "containsAbbreviatedGreeting(element?.text)"
          );
          if (
            element?.text?.startsWith("DAY_TEXT") ||
            containsAbbreviatedGreeting(element?.text)
          ) {
            let el_ = element;
            console.log(el_, "ELLLLEMENTNNN");
            el_.text = getGreeting();
            console.log(
              el_,
              el_.text,
              el_.fontSize,
              el_.width,
              el_.text.length * el_.fontSize,
              (el_.text.length * el_.fontSize) / 2,
              "CHECKTHISRN",
              "635"
            );
            el_.left = (el_.text.length * el_.fontSize) / 2 + el_.fontSize;
            final_d.push(el_);
          } else if (
            element?.text?.includes("AQI") ||
            containsAbbreviatedAQI(element?.text)
          ) {
            // const pm25Data = aws_d?.indoor_air_quality?.find(item => item.param === "pm2.5");
            const pm25Data = aws_d[0]?.indoor_air_quality?.find(
              (item) => item.param === "humidity"
            );
            let el_ = element;
            console.log(
              "CALCULATEAQI",
              aws_d,
              pm25Data,
              aws_d[0]?.indoor_air_quality
            );
            el_.text = calculateAQI(pm25Data?.["value"]);
            try {
              console.log(
                getAQIColor(
                  parseInt(calculateAQI(pm25Data?.["value"]).split(" ")[0])
                ).color,
                "getAQIColor(calculateAQI(pm25Data[value])) inside try..."
              );
            } catch (err) {
              console.log(err, "getAQIColor(calculateAQI(pm25Data[value]))");
            }
            if (pm25Data?.["value"])
              el_.fill = getAQIColor(
                parseInt(calculateAQI(pm25Data?.["value"]).split(" ")[0])
              ).color;
            el_.left = (el_.text.length * el_.fontSize) / 2 + el_.fontSize;
            final_d.push(el_);
          } else if (
            element?.text?.startsWith("Time") ||
            containsAbbreviatedTime(element?.text)
          ) {
            let dateTimeString = currTime;
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const amPm = hours >= 12 ? "PM" : "AM";

            // Convert to 12-hour format
            hours = hours % 12 || 12; // Convert 0 to 12 for midnight
            const minutesPadded = minutes.toString().padStart(2, "0"); // Ensure minutes are two digits

            const timeString_ = `${hours}:${minutesPadded} ${amPm}`;
            console.log(dateTimeString, "DATETIMEIEMIEMI");
            //let [dateString, timeString] = dateTimeString?.split(", ");console.log(dateTimeString, 'DATETIMESTRING');

            // Split the date string into day, month, and year
            // let [day, month, year] = dateString?.split("/");

            // Create a new date object
            //llet date = new Date(`${year}-${month}-${day}`);

            // Format the date
            //let options = { day: "2-digit", month: "short", year: "numeric" };
            //let formattedDate = date.toLocaleDateString("en-US", options);
            // console.log(timeString);
            let el_ = element;
            el_.text = timeString_;
            console.log(
              el_.text,
              el_.fontSize,
              el_.text.length * el_.fontSize,
              "FONTMODIFICATION"
            );
            el_.left = (el_.text.length * el_.fontSize) / 2;
            final_d.push(el_);
          } else if (element?.text?.startsWith("Location")) {
            let el_ = element;
            el_.text = "Location: Delhi";
            final_d.push(el_);
          }
          console.log(element.text, "element...IS HERE", aws_d);
          if (!aws_d) {
            return;
          }
          console.log("still going inside");
          let el_ = element;
          const regex = /< (.*?) >/;
          const match = el_?.id?.match(regex);
          const valueInsideBrackets = match ? match[1] : null;
          console.log(valueInsideBrackets);
          let el_split = valueInsideBrackets;
          console.log(el_split);
          let keyData = aws_d;
          function containsOnlyNumbers(str) {
            return /^\d+$/.test(str);
          }
          // console.log(containsOnlyNumbers(keyData))
          if (el_split?.length > 1) {
            keyData = aws_d[el_split];
            el_.text = keyData;
            console.log(el_, "EL DATA");
          }
          console.log(el_);
          final_d.push(el_);
        } else if (element.type.startsWith("i-text")) {
          console.log(
            element,
            "THIS IS THE TEXT VALII CHEEZ",
            element.text,
            !element.text
          );

          if (isEmpty(element.text)) {
            return;
          }
          if (element?.text?.startsWith("DAY_TEXT")) {
            let el_ = element;
            el_.text = "Good Morning";
            console.log(
              el_,
              el_.text,
              el_.fontSize,
              el_.width,
              el_.text.length * el_.fontSize,
              (el_.text.length * el_.fontSize) / 2,
              "CHECKTHISRN",
              "734"
            );
            // el_.left = (el_.text.length*el_.fontSize)/2;
            final_d.push(el_);
          } else if (
            element?.text?.startsWith("Date") ||
            containsAbbreviatedMonth(element?.text)
          ) {
            let dateTimeString = currTime;
            console.log(dateTimeString, "DATETIMEIEMIEMI");
            //let [dateString, timeString] = dateTimeString?.split(", ");console.log(dateTimeString, 'DATETIMESTRING');

            // Split the date string into day, month, and year
            // Get today's date
            let today = new Date();

            // Format the date as DD/MM/YYYY
            let day = String(today.getDate()).padStart(2, "0"); // Ensure 2 digits
            let month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
            let year = today.getFullYear();
            // Create a new date object
            let date = new Date(`${year}-${month}-${day}`);

            // Format the date
            let options = { day: "2-digit", month: "short", year: "numeric" };
            let formattedDate = date.toLocaleDateString("en-US", options);

            let el_ = element;
            el_.text = "Date: " + new Date().toLocaleString();
            console.log("Date: " + new Date().toLocaleString());
            alert("Date: " + new Date().toLocaleString());
            el_.text = formattedDate;
            final_d.push(el_);
          }
          if (
            element?.text?.startsWith("Time") ||
            containsAbbreviatedTime(element?.text)
          ) {
            let dateTimeString = currTime;
            console.log(dateTimeString, "DATETIMEIEMIEMI");
            //let [dateString, timeString] = dateTimeString?.split(", ");console.log(dateTimeString, 'DATETIMESTRING');

            // Split the date string into day, month, and year
            //let [day, month, year] = dateString.split("/");

            // Create a new date object
            //llet date = new Date(`${year}-${month}-${day}`);

            // Format the date
            //let options = { day: "2-digit", month: "short", year: "numeric" };
            //let formattedDate = date.toLocaleDateString("en-US", options);
            // console.log(timeString);
            let now = new Date();

            // Extract hours, minutes, and seconds
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            // Determine AM/PM
            let ampm = hours >= 12 ? "PM" : "AM";

            // Convert hours to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // The hour '0' should be '12'

            // Pad minutes and seconds with leading zeros if needed
            minutes = String(minutes).padStart(2, "0");
            seconds = String(seconds).padStart(2, "0");

            // Combine into time string
            let timeString = `${hours}:${minutes} ${ampm}`;
            let el_ = element;
            el_.text = timeString;
            final_d.push(el_);
          } else {
            final_d.push(element);
          }
        } else {
          //04/03/2024, 04:05 AM
          if (
            element?.text?.startsWith("Date") ||
            containsAbbreviatedMonth(element?.text)
          ) {
            let dateTimeString = currTime;
            console.log(dateTimeString, "DATETIMEIEMIEMI");
            //let [dateString, timeString] = dateTimeString?.split(", ");console.log(dateTimeString, 'DATETIMESTRING');

            // Split the date string into day, month, and year
            //let [day, month, year] = dateString.split("/");

            // Create a new date object
            //llet date = new Date(`${year}-${month}-${day}`);

            // Format the date
            //let options = { day: "2-digit", month: "short", year: "numeric" };
            //let formattedDate = date.toLocaleDateString("en-US", options);

            // let el_ = element;
            // el_.text = formattedDate;
            // final_d.push(el_);
          }
          if (
            element?.text?.startsWith("Time") ||
            containsAbbreviatedTime(element?.text)
          ) {
            let dateTimeString = currTime;
            console.log(dateTimeString, "DATETIMEIEMIEMI");
            //let [dateString, timeString] = dateTimeString?.split(", ");console.log(dateTimeString, 'DATETIMESTRING');

            // Split the date string into day, month, and year
            //let [day, month, year] = dateString.split("/");

            // Create a new date object
            //llet date = new Date(`${year}-${month}-${day}`);

            // Format the date
            //let options = { day: "2-digit", month: "short", year: "numeric" };
            //let formattedDate = date.toLocaleDateString("en-US", options);
            let now = new Date();

            // Extract hours, minutes, and seconds
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            // Determine AM/PM
            let ampm = hours >= 12 ? "PM" : "AM";

            // Convert hours to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // The hour '0' should be '12'

            // Pad minutes and seconds with leading zeros if needed
            minutes = String(minutes).padStart(2, "0");
            seconds = String(seconds).padStart(2, "0");

            // Combine into time string
            let timeString = `${hours}:${minutes} ${ampm}`;
            let el_ = element;
            el_.text = timeString;
            final_d.push(el_);
          } else {
            final_d.push(element);
          }
        }
      });
      function removeEmptyTextElements(data) {
        return data.filter((item) => {
          return (
            !(item.type === "text" || item.type === "i-text") ||
            (item.text !== undefined && item.text.trim() !== "")
          );
        });
      }
      function adjustZoomToFit(editor) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const canvasWidth = editor?.canvas.width;
        const canvasHeight = editor?.canvas.height;

        // Calculate zoom factors for width and height
        const zoomWidth = screenWidth / canvasWidth;
        const zoomHeight = screenHeight / canvasHeight;

        // Choose the smaller zoom factor to fit both dimensions
        const zoomFactor = Math.min(zoomWidth, zoomHeight);

        // Apply the zoom to the canvas
        // alert(zoomFactor+'ZOOMFACTOR')
        editor?.canvas.setZoom(zoomFactor);
      }

      const filteredData = removeEmptyTextElements(final_d);
      console.log("loading...", final_d);
      console.log(editor?.canvas.getZoom(), "ZOOMFACTOR");
      // editor?.canvas.setZoom(0.5);
      editor?.canvas?.loadFromJSON({
        objects: filteredData,
      });
      editor?.canvas.renderAll();
      // captureCanvasAsImage();
    }
  };

  // Handle window resizing
  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [editor, dimensions]);

  useEffect(() => {
    // const platform = window.navigator.platform // different way of checking os
    // console.log("🚀 ~ useEffect ~ platform:", platform)
    // const isRaspberryPiOS = () => {
    //   const platform = navigator.platform.toLowerCase();
    //   return platform.includes("linux") && platform.includes("arm");
    // };

    // if (isRaspberryPiOS()) {
    //   console.log("This appears to be Raspberry Pi OS.");
    // } else {
    //   console.log("This is not Raspberry Pi OS.");
    // }
    let timeout;
    // alert(osName)
    console.log(osName);
    // (async()=>{await callApi({
    //   method: 'POST',
    //   endpoint: `api/screen/os-name/set/osName`,
    //   data: { 'osName': osName },
    // })
    //   .then((res) => {})
    //   .catch((err)=>{

    //   })})();
    // if (osName !== "SUPPORTED_OPERATING_SYSTEM") {
    //   timeout = setTimeout(() => {
    //     navigate("/not-supported");
    //   }, 60 * 1000);
    // }
    // return () => {
    //   if (timeout) {
    //     clearTimeout(timeout);
    //   }
    // };
  }, []);

  // useEffect(() => {
  //   if (editor?.canvas) {
  //     editor.canvas.setWidth(dimensions.width);
  //     editor.canvas.setHeight(dimensions.height);
  //     editor.canvas.renderAll();
  //   }
  // }, [dimensions, editor]);
  useEffect(() => {
    // Set an interval to update the canvas image every second
    const intervalId = setInterval(() => {
      const imageSrc = getCanvasImageSrc();
      if (imageSrc) {
        setCanvasImage(imageSrc); // Update the state with the new image data URL
      }
    }, 1000); // 1000 milliseconds (1 second)

    // Clean up the interval when the component is unmounted or when editor changes
    return () => clearInterval(intervalId);
  }, [editor]); // Only run the effect when the editor is ready

  return (
    //<div className="w-full h-screen p-0 bg-gray-400">
    //<div className="h-[100%] w-[100%] bg-black shadow-xl">
    <div
      className="p-0 bg-black cursor-none shadow-xl"
      style={{
        // width: dimensions.width,
        // height: dimensions.height,
        width: "100vw",
        height: "100%",
        cursor: "none",
      }}
    >
      
      {/* <div className={`h-[100%] w-[100%] bg-transparent shadow-xl ${ timeMode === "MORNING"? `opacity-100` : `opacity-50`} `}> */}
      <div
        className={`bg-transparent shadow-xl ${
          timeMode === "MORNING" ? `opacity-100` : `opacity-100`
        } `}
        style={{
          // width: dimensions.width,
          // height: dimensions.height,
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* <img
          src={canvasImage}
          alt="Captured Canvas"
          style={{
            maxWidth: "100%", // Ensures the image resizes with the screen width
            zIndex: 99999999999999999999999999,
            width: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        /> */}

        <div
          className={`relative shadow-lg`}
          style={{
            // width: dimensions.width,
            // width: dimensions.width,
            // height: dimensions.height,
            width: "100vw",
            height: "100vh",
            // display: "none",
          }}
        >
          <TransformWrapper
            // defaultScale={0.5}
            // defaultPositionX={200}
            // defaultPositionY={200}
            initialScale={0.5}
            initialPositionX={100}
            initialPositionY={
              props.instances?.[props?.currentInstance]?.height < 800
                ? Math.abs(
                    props.instances?.[props?.currentInstance]?.height / 2
                  )
                : 300
            }
            // className="rela1ive h-[100%] flex items-center justify-center w-[100%] overflow-x-auto overflow-y-auto bg-white"
            minScale={0.1}
            maxScale={18}
            disabled={disablePanMode}
            ref={parentRef}
            limitToBounds={false}
            centerZoomedOut={true}
            centerOnInit={true}
            // smooth={false}
          >
            {({
              zoomIn,
              zoomOut,
              resetTransform,
              positionX,
              positionY,
              ...rest
            }) => (
              <React.Fragment>
                {/* <text className="fixed bottom-4 bottom-40 left-6 z-10 font-medium bg-white p-2 shadow-lg border border-indigo-300">
                  {`Page ${props.currentInstance + 1} of ${
                    props.instances.length
                  }`}
                </text> */}
                <div className="fixed bg-white flex bottom-40 right-[450px] z-[2] right-4 border border-indigo-300 shadow-lg">
                 
                  <button
                    className="px-4 py-2 border-l border-l-indigo-300 hover:bg-indigo-500 flex items-center justify-center"
                    onClick={() => zoomIn()}
                  >
                    <AddIcon />
                  </button>
                  <button
                    className="px-4 py-2 border-l border-l-indigo-300 hover:bg-indigo-500 flex items-center justify-center"
                    onClick={() => zoomOut()}
                  >
                    <MinusIcon />
                  </button>
                  <button
                    className="px-4 py-2 border-l border-l-indigo-300 hover:bg-indigo-500 flex items-center justify-center"
                    onClick={() => {
                      // resetTransform(width / 2)
                      let canvas =
                        document.getElementsByClassName("canvas-container");
                      if (!canvas) return;
                      parentRef.current?.zoomToElement(canvas[0]);
                    }}
                  >
                    <ResetIcon size={20} />
                  </button>
                  <button
                    className={`px-4 py-2 border-l border-l-indigo-300 hover:bg-indigo-500 flex items-center justify-center ${
                      !disablePanMode ? "bg-indigo-500" : ""
                    }`}
                    onClick={() => setDisablePanMode((prev) => !prev)}
                  >
                    <HandIcon color={"#fff"} />
                  </button>
                </div>
                <TransformComponent>
                  <FabricJSCanvas
                    className={`h-full w-full bg-black shadow-lg border border-gray-400 relative `}
                    onReady={(p) => {
                      onReady(p);
                      let canvasContainer =
                        document.getElementsByClassName("canvas-container")[0];
                      let lowerCanvas =
                        document.getElementsByClassName("lower-canvas")[0];
                      let upperCanvas =
                        document.getElementsByClassName("upper-canvas")[0];
                      editor?.canvas.setHeight(height);
                      canvasContainer.style.height = `${height}px`;
                      lowerCanvas.style.height = `${height}px`;
                      upperCanvas.style.height = `${height}px`;
                      editor?.canvas.setWidth(width);
                      canvasContainer.style.width = `${width}px`;
                      lowerCanvas.style.width = `${width}px`;
                      upperCanvas.style.width = `${width}px`;
                      editor?.canvas.renderAll();
                      setTimeout(() => {
                        console.log('editor?.canvas', editor?.canvas, editor, p)
                      // initAligningGuidelines(editor?.canvas);
                      
                        editor?.canvas?.setDimensions({
                          width:
                            props?.instances?.[props?.currentInstance].width,
                          height:
                            props?.instances?.[props?.currentInstance].height,
                        });
                        console.log(
                          "REQUESTING...",
                          props?.instances?.[props?.currentInstance].width,
                          props?.instances?.[props?.currentInstance].height
                        );
                        editor?.canvas.requestRenderAll();
                      }, 1000);
                    }}
                  />
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper>
          {/* <FabricJSCanvas
            style={{
              width: dimensions.width,
              height: dimensions.height,
              
              // opacity: 0,
              // zIndex: -100,
            }}
            
            onReady={onReady}
            selection={false}
          /> */}

          <div className="absolute w-full h-full top-0 bg-transparent ">
            {/* / WRAPPER OVER A CANVAS TO DISABLE THE CANVAS/ */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default stateConnected(Preview);
