import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  FabricJSCanvas,
  useFabricJSEditor,
  initAligningGuidelines,
} from "fabricjs-react";
import { stateConnected } from "../../utils/redux_tools";
import CreatorHeader from "./creator/CreatorHeader";
import CreatorFooter from "./creator/CreatorFooter";
import CreatorSidebar from "./creator/CreatorSidebar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import HandIcon from "./creator/icons/HandIcon";
import AddIcon from "./creator/icons/AddIcon";
import MinusIcon from "./creator/icons/MinusIcon";
import { useParams, useLocation } from "react-router-dom";
import ResetIcon from "./creator/icons/ResetIcon";
import { callApi } from "../../utils/api";
import { useTimeout } from "@mui/x-data-grid/internals";
import Alert from "../../utils/Alert";

const Creator = (props) => {
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [colorStandard, setColorStandard] = useState("WHO");
  const name = queryParams.get("name");

  const [canvasLoading, setCanvasLoading] = useState(true);

  const [height, setHeight] = useState(1080);

  const [width, setWidth] = useState(1920);

  React.useEffect(() => {
    let canvasContainer =
      document.getElementsByClassName("canvas-container")[0];
    let lowerCanvas = document.getElementsByClassName("lower-canvas")[0];
    let upperCanvas = document.getElementsByClassName("upper-canvas")[0];

    editor?.canvas.setHeight(height);

    canvasContainer.style.height = `${height}px`;
    lowerCanvas.style.height = `${height}px`;
    upperCanvas.style.height = `${height}px`;
    editor?.canvas.setWidth(width);
    lowerCanvas.style.width = `${width}px`;
    upperCanvas.style.width = `${width}px`;

    editor?.canvas.renderAll();

    return () => {
      editor?.canvas.dispose(); // Cleanup on component unmount
    };
  }, []);
  const [tool, setTool] = useState("");
  const [disablePanMode, setDisablePanMode] = useState(true);

  const [togglefirstTime, setTogglefirstTime] = useState(false); // helps to load the data on the refresh

  const onAddCircle = () => {
    const canvasCenter = editor.canvas.getCenter();
    let random = Math.random().toString(36).slice(2);
    const circleOptions = {
      left: canvasCenter.left,
      top: canvasCenter.top,
      radius: 20,
      id: "circle-" + random,
      originX: "center",
      originY: "center",
      stroke: "#fff",
    };
    const circle = new fabric.Circle(circleOptions);
    editor?.canvas.add(circle);
  };

  const onAddRectangle = () => {
    const canvasCenter = editor.canvas.getCenter();
    let random = Math.random().toString(36).slice(2);
    const rectOptions = {
      left: canvasCenter.left,
      top: canvasCenter.top,
      width: 200,
      height: 100,
      stroke: "white",
      id: "rect-" + random,
      originX: "center",
      originY: "center",
    };
    const rectangle = new fabric.Rect(rectOptions);
    editor?.canvas.add(rectangle);
  };

  const onAddLine = () => {
    const canvasCenter = editor.canvas.getCenter();
    let random = Math.random().toString(36).slice(2);
    const lineOptions = {
      left: canvasCenter.left,
      top: canvasCenter.top,
      id: "line-" + random,
      originX: "center",
      originY: "center",
      x1: -75,
      x2: 75,
      y1: -50,
      y2: 50,
      stroke: "#ffffff",
    };
    const line = new fabric.Line([0, 0, 100, 0], { ...lineOptions });
    editor?.addLine(line);
    // editor?.canvas.add(lineOptions);
    editor.canvas.renderAll();
  };

  const onAddText = () => {
    const canvasCenter = editor.canvas.getCenter();
    let random = Math.random().toString(36).slice(2);
    const textOptions = {
      left: canvasCenter.left,
      top: canvasCenter.top,
      fontFamily: "lato",
      id: "text-" + random,
      fontSize: 28,
      fill: "white",
      editable: true,
      originX: "center",
      originY: "center",
    };
    const text = new fabric.IText("Your Text Here", textOptions);
    editor?.canvas.add(text);
  };

  const onAddTriangle = () => {
    const canvasCenter = editor.canvas.getCenter();
    let random = Math.random().toString(36).slice(2);
    const triangle = new fabric.Triangle({
      width: 100, // Width of the triangle
      height: 100, // Height of the triangle
      fill: "white", // Fill color of the triangle
      id: "triangle-" + random,
      left: canvasCenter.left,
      top: canvasCenter.top,
      originX: "center",
      originY: "center",
    });

    // Add the triangle to the canvas
    editor?.canvas.add(triangle);
    editor?.canvas.renderAll();
  };

  const onAddImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const canvasCenter = editor.canvas.getCenter();
        let random = Math.random().toString(36).slice(2);

        fabric.Image.fromURL(imageUrl, (img) => {
          // Set the position and size of the image
          img.set({
            left: canvasCenter.left,
            top: canvasCenter.top,
            originX: "center",
            originY: "center",
            id: "img-" + random,
            scaleX: 0.5,
            scaleY: 0.5,
          });

          // Add the image to the canvas
          editor.canvas.add(img);

          // Render the canvas
          editor.canvas.renderAll();
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const onAddImageBackground = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const canvasCenter = editor.canvas.getCenter();
        let random = Math.random().toString(36).slice(2);

        fabric.Image.fromURL(imageUrl, (img) => {
          // Set the position and size of the image
          img.set({
            left: width / 2,
            top: height / 2,
            originX: "center",
            originY: "center",
            selectable: false, // Optional: prevent selection if it's a background
            evented: false, // Optional: prevent events if it's a background
          });

          // Scale the image to fit the canvas
          img.scaleToWidth(width);
          img.scaleToHeight(height);

          // Add the image to the canvas
          editor.canvas.add(img);

          editor.canvas.sendToBack(img);
          editor.canvas.setBackgroundImage(
            img,
            editor.canvas.renderAll.bind(editor.canvas)
          );

          // Render the canvas
          editor.canvas.renderAll();
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const onAddDefaultTemplate = (event) => {
    alert("working");
  };

  const onDelete = () => {
    if (selectedObjects && selectedObjects.length > 0) {
      // Iterate through selected objects and remove each one
      selectedObjects.forEach((obj) => {
        editor?.canvas.remove(obj);
      });
    }
  };

  const config = {
    /** At what distance from the shape does alignment begin? */
    margin: 4,
    /** Aligning line dimensions */
    width: 1,
    /** Aligning line color */
    color: "rgb(255,0,0,0.9)",
  };

  const isEventSuppressed = useRef(false);
  const currentInstanceRef = useRef(props.currentInstance);

  const handleObjectAdded = (options) => {
    if (isEventSuppressed.current) {
      console.log("🚀 Event suppressed, ignoring object removal.");
      return; // Ignore the event if suppression is active
    }
    const deactivate = initAligningGuidelines(editor?.canvas); // Initialize aligning guidelines

    console.log(editor?.canvas.toJSON(), "EDITOR");

    fabric.Object.prototype.toObject = ((toObject) => {
      return function (propertiesToInclude) {
        return {
          ...toObject.call(this, propertiesToInclude),
          id: this.id, // Preserving the original 'id' inclusion
          customProperty: this.customProperty, // Adding a new custom property
        };
      };
    })(fabric.Object.prototype.toObject);

    console.log(editor?.canvas.toJSON(), "EDITOR");

    // Use the currentInstanceRef to get the latest value of props.currentInstance
    props._updateInstance({
      id: currentInstanceRef.current, // Use the ref value here
      instance: currentInstanceRef.current, // Use the ref value here
      data: editor?.canvas?.toJSON()?.objects,
    });

    console.log(
      "🚀 ~ handleObjectAdded ~ _updateInstance:",
      props._updateInstance
    );
  };

  const initAligningGuidelines = (canvas) => {
    const aligningLineOffset = 5;
    const aligningLineMargin = 4;
    const aligningLineWidth = 1;
    const aligningLineColor = "rgb(255,0,0)";
    const aligningDash = [5, 5];
    let verticalLines = [];
    let horizontalLines = [];
    let ctx = canvas.getSelectionContext();
    let viewportTransform;
    let zoom = 1;

    // Handle mouse down event to capture initial viewport transform and zoom
    canvas.on("mouse:down", () => {
      viewportTransform = canvas.viewportTransform;
      zoom = canvas.getZoom();
    });

    // Handle object moving event for snapping
    canvas.on("object:moving", (e) => {
      const activeObject = e.target;
      const activeObjectCenter = activeObject.getCenterPoint();
      const activeObjectBoundingRect = activeObject.getBoundingRect();
      const activeObjectHalfHeight =
        activeObjectBoundingRect.height / (2 * viewportTransform[3]);
      const activeObjectHalfWidth =
        activeObjectBoundingRect.width / (2 * viewportTransform[0]);

      canvas
        .getObjects()
        .filter((object) => object !== activeObject && object.visible)
        .forEach((object) => {
          const objectCenter = object.getCenterPoint();
          const objectBoundingRect = object.getBoundingRect();
          const objectHalfHeight =
            objectBoundingRect.height / (2 * viewportTransform[3]);
          const objectHalfWidth =
            objectBoundingRect.width / (2 * viewportTransform[0]);

          // Snap by vertical and horizontal lines
          snapVertical(objectCenter.x, activeObjectCenter.x, objectCenter.x);
          snapHorizontal(objectCenter.y, activeObjectCenter.y, objectCenter.y);

          // Function for snapping vertically
          function snapVertical(objEdge, activeEdge, snapCenter) {
            if (isInRange(objEdge, activeEdge)) {
              verticalLines.push({
                x: objEdge,
                y1:
                  objectCenter.y < activeObjectCenter.y
                    ? objectCenter.y - objectHalfHeight - aligningLineOffset
                    : objectCenter.y + objectHalfHeight + aligningLineOffset,
                y2:
                  activeObjectCenter.y > objectCenter.y
                    ? activeObjectCenter.y +
                      activeObjectHalfHeight +
                      aligningLineOffset
                    : activeObjectCenter.y -
                      activeObjectHalfHeight -
                      aligningLineOffset,
              });
              activeObject.setPositionByOrigin(
                new fabric.Point(snapCenter, activeObjectCenter.y),
                "center",
                "center"
              );
            }
          }

          // Function for snapping horizontally
          function snapHorizontal(objEdge, activeObjEdge, snapCenter) {
            if (isInRange(objEdge, activeObjEdge)) {
              horizontalLines.push({
                y: objEdge,
                x1:
                  objectCenter.x < activeObjectCenter.x
                    ? objectCenter.x - objectHalfWidth - aligningLineOffset
                    : objectCenter.x + objectHalfWidth + aligningLineOffset,
                x2:
                  activeObjectCenter.x > objectCenter.x
                    ? activeObjectCenter.x +
                      activeObjectHalfWidth +
                      aligningLineOffset
                    : activeObjectCenter.x -
                      activeObjectHalfWidth -
                      aligningLineOffset,
              });
              activeObject.setPositionByOrigin(
                new fabric.Point(activeObjectCenter.x, snapCenter),
                "center",
                "center"
              );
            }
          }
        });
    });

    // Clear the canvas context before rendering new lines
    canvas.on("before:render", () => {
      try{
        canvas?.clearContext(canvas?.contextTop);
      }catch(err){
        
      }
    });

    // Render the vertical and horizontal lines after render
    canvas.on("after:render", () => {
      verticalLines.forEach((line) => drawVerticalLine(line));
      horizontalLines.forEach((line) => drawHorizontalLine(line));
      verticalLines = [];
      horizontalLines = [];
    });

    // Render lines on the canvas
    function drawVerticalLine(coords) {
      drawLine(coords.x + 0.5, coords.y1, coords.x + 0.5, coords.y2);
    }

    function drawHorizontalLine(coords) {
      drawLine(coords.x1, coords.y + 0.5, coords.x2, coords.y + 0.5);
    }

    function drawLine(x1, y1, x2, y2) {
      if (ctx) {
        ctx.save();
        ctx.lineWidth = aligningLineWidth;
        ctx.strokeStyle = aligningLineColor;
        ctx.setLineDash(aligningDash);
        ctx.beginPath();
        ctx.moveTo(
          x1 * zoom + viewportTransform[4],
          y1 * zoom + viewportTransform[5]
        );
        ctx.lineTo(
          x2 * zoom + viewportTransform[4],
          y2 * zoom + viewportTransform[5]
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    // Return true if value2 is within value1 +/- aligningLineMargin
    function isInRange(value1, value2) {
      return (
        value2 > value1 - aligningLineMargin &&
        value2 < value1 + aligningLineMargin
      );
    }
  };

  const handleObjectRemoved = (options) => {
    if (isEventSuppressed.current) {
      console.log("🚀 Event suppressed, ignoring object removal.");
      return; // Ignore the event if suppression is active
    }
    console.log("🚀 ~ handleObjectRemoved ~ options:", options);

    console.trace("🚀 ~ Stack Trace for Object Removal");

    // Check and log the removed object if it exists
    const removedObject = options.target; // 'target' holds the removed object
    if (removedObject) {
      console.log("🚀 ~ handleObjectRemoved ~ Removed Object:", removedObject);
    } else {
      console.log("No object found in the event options.");
    }

    // Update the instance with the new canvas state
    props._updateInstance({
      id: props.currentInstance,
      instance: props.currentInstance,
      data: editor?.canvas?.toJSON()?.objects,
    });
    console.log(
      "🚀 ~ handleObjectRemoved ~ _updateInstance:",
      props._updateInstance
    );
  };
  const handleObjectModified = (options) => {
    if (isEventSuppressed.current) {
      console.log("🚀 Event suppressed, ignoring object removal.");
      return; // Ignore the event if suppression is active
    }
    // Update the toObject prototype (this part stays the same)
    fabric.Object.prototype.toObject = ((toObject) => {
      return function (propertiesToInclude) {
        return {
          ...toObject.call(this, propertiesToInclude),
          id: this.id, // Preserving the original 'id' inclusion
          customProperty: this.customProperty, // Adding a new custom property
        };
      };
    })(fabric.Object.prototype.toObject);

    // Use currentInstanceRef to get the live value of props.currentInstance
    props._updateInstance({
      id: currentInstanceRef.current, // Use the ref value here
      instance: currentInstanceRef.current, // Use the ref value here
      data: editor?.canvas?.toJSON()?.objects,
    });

    console.trace(
      "🚀 ~ handleObjectModified ~ _updateInstance:",
      props._updateInstance,
      {
        id: currentInstanceRef.current,
        instance: currentInstanceRef.current,
        data: editor?.canvas?.toJSON()?.objects,
      }
    );
  };

  const handleClearCanvas = (options) => {};

  // const handleObjectSelected = (options) => {
  //   const selectedObject = options.target;
  //   console.log("Object selected:", selectedObject);
  // };

  // const handleSelectionCreated = (options) => {
  //   const selectedObjects = options.selected;
  //   if (selectedObjects)
  //   console.log("Selection created:", options.selected?.[0].type);
  // };

  // const handleSelectionCleared = (options) => {
  //   setTool(null);
  // };

  // const handleMouseDown = (options) => {
  //   console.log("Mouse down:", options);
  // };

  // const handleMouseUp = (options) => {
  //   console.log("Mouse up:", options);
  // };

  // const handleCanvasCleared = () => {
  //   console.log("Canvas cleared");
  // };

  // const handlePathCreated = (options) => {
  //   const createdPath = options.path;
  //   console.log("Path created:", createdPath);
  // };

  useEffect(() => {
    editor?.canvas.on({
      "object:added": handleObjectAdded,
      "object:removed": handleObjectRemoved,
      "object:modified": handleObjectModified,
      // "object:selected": handleObjectSelected,
      // "selection:created": handleSelectionCreated,
      // "selection:cleared": handleSelectionCleared,
      // "mouse:down": handleMouseDown,
      // "mouse:up": handleMouseUp,
      // "canvas:cleared": handleCanvasCleared,
      // "path:created": handlePathCreated,
    });

    return () => {
      editor?.canvas.off({
        "object:added": handleObjectAdded,
        "object:removed": handleObjectRemoved,
        "object:modified": handleObjectModified,
        // "object:selected": handleObjectSelected,
        // "selection:created": handleSelectionCreated,
        // "selection:cleared": handleSelectionCleared,
        // "mouse:down": handleMouseDown,
        // "mouse:up": handleMouseUp,
        // "canvas:cleared": handleCanvasCleared,
        // "path:created": handlePathCrea ted,
      });
    };
  }, [editor]);

  const cbToDelete = () => {
    isEventSuppressed.current = true;
    editor?.canvas?.clear(); // Clear the canvas
    editor?.canvas?.loadFromJSON(
      {
        objects: props?.instances?.[props.currentInstance].data,
      },
      () => {
        // Callback after loadFromJSON completes
        editor?.canvas?.renderAll();
        editor?.canvas?.setDimensions({
          width: props?.instances?.[props?.currentInstance].width,
          height: props?.instances?.[props?.currentInstance].height,
        });

        isEventSuppressed.current = false;
      }
    );
  };

  useEffect(() => {
    setTogglefirstTime(true); // Trigger other useEffect to load data on refresh

    if (props.instances[props.currentInstance]?.data) {
      isEventSuppressed.current = true;
      editor?.canvas?.clear(); // Clear the canvas
      editor?.canvas?.loadFromJSON(
        {
          objects: props?.instances?.[props.currentInstance].data,
        },
        () => {
          // Callback after loadFromJSON completes
          editor?.canvas?.renderAll();
          editor?.canvas?.setDimensions({
            width: props?.instances?.[props?.currentInstance].width,
            height: props?.instances?.[props?.currentInstance].height,
          });

          isEventSuppressed.current = false;
        }
      );
    }
    currentInstanceRef.current = props.currentInstance;
  }, [props.currentInstance]);

  useEffect(() => {
    if (!togglefirstTime) {
      return;
    }
    setCanvasLoading(true);
    (async () => {
      await callApi({
        endpoint: `api/Dashboard/${id.split("=")[1]}`,
        alert: true,
      })
        .then((res) => {
          if (!res?.template) {
            Error("Data Not Found...");
            props._updateAllInstances([]);
            editor?.canvas?.clear();
            setCanvasLoading(false);
            return;
          }
          editor.canvas.backgroundColor = "black";
          // editor.canvas.renderTop();
          // clearing all instances to load the data
          props._updateAllInstances([]);
          setTimeout(() => {
            props._updateAllInstances([]);
            props._updateAllInstances(res?.template);
            editor?.canvas?.clear();
            console.log("RESPONSE....", res);
            //// Added update-Current-Instance to Trigger the Re-Render
            props._updateCurrentInstance(props.instances.length + 1);
            setTimeout(() => {
              props._updateCurrentInstance(0);
              props._updateAllInstances(res.template);
              setHeight(res?.template?.[0].height);
              setWidth(res?.template?.[0].width);
              setCanvasLoading(false);
            }, 200);
            ////
            if (props.instances[props.currentInstance]?.data) {
              editor?.canvas?.loadFromJSON({
                objects: props?.instances?.[props.currentInstance].data,
              });
              editor?.canvas?.renderAll();
              editor?.canvas?.setDimensions({
                width: props?.instances?.[props?.currentInstance].width,
                height: props?.instances?.[props?.currentInstance].height,
              });
              setTimeout(() => {
                editor?.canvas?.renderAll();
              }, 500);
            }
          }, 1000);
        })
        .catch((err) => {
          console.log("🚀 ~ file: Creator.jsx:351 ~ err:", err);
          setCanvasLoading(false);
          editor.canvas.clear();
        });
    })();
  }, [togglefirstTime]);

  // TO RENDER THE SELECTED TOOL TYPE...
  useEffect(() => {
    if (selectedObjects.length > 1) {
      setTool(null);
      return;
    }
    let type = selectedObjects[0]?.type;
    if (type === tool) return;
    setTool(selectedObjects[0]?.type);
  }, [selectedObjects[0]?.type]);

  const parentRef = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      let targetClassName = event?.target?.className.toString();
      if (
        targetClassName?.includes("react-transform-wrapper") &&
        parentRef?.current?.zoomIn
      ) {
        setTool("");
        editor.canvas.discardActiveObject();
        editor.canvas.renderAll();
      } else if (targetClassName === "upper-canvas") {
        if (selectedObjects.length > 1) {
          setTool("");
          return;
        }
        let type = selectedObjects[0]?.type;
        if (type === tool) return;
        setTool(selectedObjects[0]?.type);
      } else {
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onReady]);

  // Adding inerval to reload after every 15 mins
  useEffect(() => {
    let interval = setInterval(() => {
      window.location.reload();
    }, 60000 * 15);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#7367f0";
    fabric.Object.prototype.cornerStyle = "circle";

    let deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    let cloneIcon =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z' fill='white'%3E%3C/path%3E%3C/svg%3E";

    const deleteImg = new fabric.Image();
    const cloneImg = new fabric.Image();

    deleteImg.setElement(document.createElement("img"));
    cloneImg.setElement(document.createElement("img"));

    deleteImg.getElement().src = deleteIcon;
    cloneImg.getElement().src = cloneIcon;

    function renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        const size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon.getElement(), -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    }

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: "pointer",
      mouseUpHandler: onDelete,
      render: renderIcon(deleteImg),
      cornerSize: 34,
    });

    function cloneObject(eventData, transform) {
      const target = transform.target;
      const canvas = target.canvas;
      target.clone(function (cloned) {
        cloned.left += 10;
        cloned.top += 10;
        canvas.add(cloned);
      });
    }

    fabric.Object.prototype.controls.clone = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: "pointer",
      mouseUpHandler: cloneObject,
      render: renderIcon(cloneImg),
      cornerSize: 34,
    });
  }, []);
  // }, selectedObjects[]);
  const [inputValue, setInputValue] = useState(
    props.instances?.[props?.currentInstance]?.secs
      ? props.instances?.[props?.currentInstance]?.secs
      : 10
  );

  const handleChange = (event) => {
    setInputValue(parseInt(event.target.value));
  };

  React.useEffect(() => {
    console.log(props.instances?.[props?.currentInstance]?.secs, "SECONDS");
    setTimeout(() => {
      setInputValue(
        props.instances?.[props?.currentInstance]?.secs
          ? props.instances?.[props?.currentInstance]?.secs
          : 10
      );
    }, 200);
  }, [props.instances?.[props?.currentInstance]?.secs]);

  return (
    <div className="h-[100vh] w-[100vw] flex bg-gray-400 items-center overflow-hidden ">
      <div className="h-[100vh] w-[80vw] border flex flex-col justify-between overflow-hidden ">
        <CreatorHeader
          colorStandard={colorStandard}
          setColorStandard={setColorStandard}
          height={height}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          editor={editor}
          name={name}
          canvasLoading={canvasLoading}
          setCanvasLoading={setCanvasLoading}
        />
        <div
          className={`relative h-[100%] flex items-center justify-center w-[100%] overflow-x-auto overflow-y-scroll bg-white ${
            !disablePanMode ? "cursor-grab" : ""
          }`}
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
                  <input
                    style={{ width: 50, paddingLeft: 2 }}
                    value={inputValue}
                    onChange={handleChange}
                    type="number"
                  ></input>
                  <button
                    className="px-4 py-2 border-l border-l-indigo-300 hover:bg-indigo-500 flex items-center justify-center"
                    onClick={() => {
                      props._updateInstance({
                        id: props?.currentInstance,
                        secs: inputValue,
                      });
                      console.log(
                        "🚀 ~ _updateInstance:",
                        props._updateInstance
                      );
                      Alert("Seconds Update");
                    }}
                  >
                    sec update
                  </button>
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
                    className={`h-[${height}px] w-[${width}px] bg-black shadow-lg border border-gray-400 relative `}
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
                        console.log(
                          "editor?.canvas",
                          editor?.canvas,
                          editor,
                          p
                        );
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
                  {/* Creating a wrapper on a canvas to show Loading */}
                  {canvasLoading && (
                    <div
                      className={`w-full h-full bg-gray-800 absolute flex items-center justify-center`}
                    >
                      <div class="flex justify-center items-center h-screen">
                        <div class="flex gap-2">
                          <div class="w-[4vh] h-[4vh] rounded-full animate-pulse bg-gray-600"></div>
                          <div class="w-[4vh] h-[4vh] rounded-full animate-pulse bg-gray-600"></div>
                          <div class="w-[4vh] h-[4vh] rounded-full animate-pulse bg-gray-600"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Creating a wrapper on a canvas to disable Canvas editing */}
                  {!disablePanMode && (
                    <div
                      className={`w-full h-full bg-transparent absolute ${
                        !disablePanMode ? "cursor-grab" : ""
                      }`}
                    ></div>
                  )}
                  {/* Creating a wrapper on a canvas to show Nothing is selected */}
                  {/* {props.currentInstance > props.instances.length - 1 && (
                    <div
                      className={`w-full h-full bg-black absolute flex items-center justify-center  ${
                        !disablePanMode ? "cursor-pointer" : ""
                      }`}
                    >
                      <text className="text-white text-2xl text-center">
                        No Page Selected , Select Your Page.
                      </text>
                    </div>
                  )} */}
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper>
        </div>
        <CreatorFooter
          handleClearCanvas={handleClearCanvas}
          height={height}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          cbToDelete={cbToDelete}
          editor={editor}
          canvasLoading={canvasLoading}
          setCanvasLoading={setCanvasLoading}
        />
      </div>

      <CreatorSidebar
        onAddCircle={onAddCircle}
        onAddRectangle={onAddRectangle}
        onAddLine={onAddLine}
        onAddText={onAddText}
        onAddTriangle={onAddTriangle}
        onDelete={onDelete}
        onAddImage={onAddImage}
        onAddImageBackground={onAddImageBackground}
        tool={tool}
        editor={editor}
        width={width}
        height={height}
        selectedObjects={selectedObjects}
        canvasLoading={canvasLoading}
        onAddDefaultTemplate={onAddDefaultTemplate}
        setCanvasLoading={setCanvasLoading}
      />
    </div>
  );
};

export default stateConnected(Creator);
