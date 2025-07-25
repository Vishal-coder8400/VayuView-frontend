import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  FabricJSCanvas,
  useFabricJSEditor,
  initAligningGuidelines,
} from "fabricjs-react";
import { stateConnected } from "../../utils/redux_tools";
import CreatorHeader from "../Creator/creator/CreatorHeader";
import CreatorFooter from "../Creator/creator/CreatorFooter";
import CreatorSidebar from "../Creator/creator/CreatorSidebar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "../Creator/creator/icons/AddIcon";
import MinusIcon from "../Creator/creator/icons/MinusIcon";
import { useParams, useLocation } from "react-router-dom";
import ResetIcon from "../Creator/creator/icons/ResetIcon";
import { useTimeout } from "@mui/x-data-grid/internals";
import { callApi } from "../../utils/api";
import HandIcon from "../Creator/creator/icons/HandIcon";

/// for preview
import { isEmpty } from "lodash";
/// end preview

const PreviewV2 = (props) => {
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
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

  //   useEffect(() => {
  //     editor?.canvas.on({
  //       "object:added": handleObjectAdded,
  //       "object:removed": handleObjectRemoved,
  //       "object:modified": handleObjectModified,
  //       // "object:selected": handleObjectSelected,
  //       // "selection:created": handleSelectionCreated,
  //       // "selection:cleared": handleSelectionCleared,
  //       // "mouse:down": handleMouseDown,
  //       // "mouse:up": handleMouseUp,
  //       // "canvas:cleared": handleCanvasCleared,
  //       // "path:created": handlePathCreated,
  //     });

  //     return () => {
  //       editor?.canvas.off({
  //         "object:added": handleObjectAdded,
  //         "object:removed": handleObjectRemoved,
  //         "object:modified": handleObjectModified,
  //         // "object:selected": handleObjectSelected,
  //         // "selection:created": handleSelectionCreated,
  //         // "selection:cleared": handleSelectionCleared,
  //         // "mouse:down": handleMouseDown,
  //         // "mouse:up": handleMouseUp,
  //         // "canvas:cleared": handleCanvasCleared,
  //         // "path:created": handlePathCrea ted,
  //       });
  //     };
  //   }, [editor]);

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
      cursorStyle: "none",
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
      cursorStyle: "none",
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

  const [count, setCount] = useState(0);
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

  /////// FOR PREVIEW CODE

  const instancesRef = useRef(props.instances);
  const countRef = React.useRef(0);
  const [toggle, setToggle] = useState(false);
  const [aws_id, setAws_Id] = useState("");
  const [aws_d, setAws_d] = useState("");
  const [currTime, setCurrTime] = useState("");

  const awsIntervalRef = useRef(null);
  const updateDataIntervalRef = useRef(null);

  const [timeMode, setTimeMode] = useState(getTimeUpdates());

  function calculateAQIPM25PM10(pm25 = null, pm10 = null) {
    const aqiBreakpoints = {
      pm25: [
        { min: 0, max: 30, aqiMin: 0, aqiMax: 50 },
        { min: 31, max: 60, aqiMin: 51, aqiMax: 100 },
        { min: 61, max: 90, aqiMin: 101, aqiMax: 200 },
        { min: 91, max: 120, aqiMin: 201, aqiMax: 300 },
        { min: 121, max: 250, aqiMin: 301, aqiMax: 400 },
        { min: 251, max: 500, aqiMin: 401, aqiMax: 500 },
      ],
      pm10: [
        { min: 0, max: 50, aqiMin: 0, aqiMax: 50 },
        { min: 51, max: 100, aqiMin: 51, aqiMax: 100 },
        { min: 101, max: 250, aqiMin: 101, aqiMax: 200 },
        { min: 251, max: 350, aqiMin: 201, aqiMax: 300 },
        { min: 351, max: 430, aqiMin: 301, aqiMax: 400 },
        { min: 431, max: 600, aqiMin: 401, aqiMax: 500 },
      ],
    };

    function calculateSubIndex(concentration, breakpoints) {
      for (let i = 0; i < breakpoints.length; i++) {
        const bp = breakpoints[i];
        if (concentration >= bp.min && concentration <= bp.max) {
          return (
            ((bp.aqiMax - bp.aqiMin) / (bp.max - bp.min)) *
              (concentration - bp.min) +
            bp.aqiMin
          );
        }
      }
      return -1; // Return -1 if concentration is out of range
    }

    let pm25SubIndex =
      pm25 !== null ? calculateSubIndex(pm25, aqiBreakpoints.pm25) : null;
    let pm10SubIndex =
      pm10 !== null ? calculateSubIndex(pm10, aqiBreakpoints.pm10) : null;

    if (pm25SubIndex === null && pm10SubIndex === null) {
      return "Insufficient data to calculate AQI.";
    }

    if (pm25SubIndex === null) return Math.round(pm10SubIndex);
    if (pm10SubIndex === null) return Math.round(pm25SubIndex);

    // The final AQI is the maximum of the sub-indices
    return Math.round(Math.max(pm25SubIndex, pm10SubIndex)) + " ";
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
// Function to get the value of a specific parameter
function getParameterValue(data, param) {
  try {
    if (!data || typeof data === "string" || data === undefined || isEmpty(data)) {
      console.log("Returning 0 due to invalid data");
      return "0";
    }

    const entry = data[0]?.indoor_air_quality?.find(
      (item) => item.param === param
    );

    if (entry) {
      if (!entry?.value) {
        console.log("No VALUE found for parameter:", entry);
        return "0";
      }
      return parseFloat(entry.value).toFixed(0).toString() + " " + entry.unit;
    } else {
      return "0"; // Parameter not found
    }
  } catch (e) {
    console.log("Error in getParameterValue:", e);
    return "0";
  }
}

const getAllData = async (e) => {
  try {
    const res = await callApi({
      endpoint: `api/Dashboard/${id.split("=")[1]}`,
    });

    setAws_Id(res?.aws);
    console.log("AWS ID:", res?.aws);

    // Check if template exists and is a non-empty array
    const templateLength = Array.isArray(res?.template) ? res.template.length : 0;
    if (templateLength === 0) {
      console.warn("No templates found in response.");
      return;
    }

    console.log("Template length:", templateLength);
    console.log("🚀 Template data:", res.template);

    const currentInstance = props.instances[props.currentInstance];
    if (currentInstance?.data) {
      editor?.canvas?.loadFromJSON({ objects: currentInstance.data });
      editor?.canvas?.renderAll();
      editor?.canvas?.setDimensions({
        width: currentInstance.width || 1920,
        height: currentInstance.height || 1080,
      });
      setTimeout(() => {
        editor?.canvas?.renderAll();
      }, 500);
    }

    // Auto-refresh after 3 hours
    setTimeout(() => {
      window.location.reload();
    }, 60 * 180 * 1000); // 3 hours

    // Function to fetch and update AQI log
    const fetchAQILog = async () => {
      try {
        const res = await callApi({ endpoint: `aqi-last-log` });
        console.log("AQI RES:", res);

        if (!res || !Array.isArray(res.data) || res.data.length === 0) {
          console.warn("AQI data empty or invalid");
          return;
        }

        setAws_d(res.data);

        const canvasInstance = instancesRef.current[props.currentInstance];
        if (canvasInstance?.data) {
          editor?.canvas?.loadFromJSON({ objects: canvasInstance.data });
          editor?.canvas?.renderAll();
          editor?.canvas?.setDimensions({
            width: props.instances[props.currentInstance]?.width || 1920,
            height: props.instances[props.currentInstance]?.height || 1080,
          });
          setTimeout(() => {
            editor?.canvas?.renderAll();
          }, 500);
        }
      } catch (err) {
        console.log("AQI fetch error:", err);
      }
    };

    // Initial AQI fetch
    await fetchAQILog();

    // Set interval for AQI data every minute
    awsIntervalRef.current = setInterval(fetchAQILog, 60000);

    // Set interval to update dashboard every 1.75 minutes
    updateDataIntervalRef.current = setInterval(async () => {
      try {
        await getUpdatedData();
      } catch (err) {
        console.log("Error in getUpdatedData:", err);
      }
    }, 105000);

  } catch (err) {
    console.log("Error fetching Dashboard, setting fallback interval:", err);

    // Set fallback interval if initial fetch fails
    updateDataIntervalRef.current = setInterval(async () => {
      try {
        await getUpdatedData();
      } catch (err) {
        console.log("Fallback getUpdatedData error:", err);
      }
    }, 105000);
  }
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
                        height:
                          props?.instances?.[props.currentInstance].height,
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

  const manageInterval = () => {
    // Retrieve the current count value from the ref
    let count = countRef.current;
    setToggle((prev) => !prev); // toggle this to hit the load data json function

    if (count >= instancesRef.current.length - 1) {
      // Reset count if it exceeds the array length
      count = 0;
    } else {
      // Increment count if it's within the array length
      count += 1;
    }

    // Update the ref with the new count value
    countRef.current = count;

    const secs_ = instancesRef.current[count].secs
      ? instancesRef.current[count].secs
      : 10;

    // Dynamically calculate the next interval duration
    const nextInterval = secs_ * 1000;

    // Schedule the next execution
    setTimeout(manageInterval, nextInterval);
  };

  // Helper function to calculate dynamic interval

  const calculateDynamicInterval = (currentInstance) => {
  // Example logic: even instance = 3s, odd = 5s
  return currentInstance % 2 === 0 ? 3000 : 5000;
};

const PreviewV2 = (props) => {
  const intervalRef = useRef(null);
  const instancesRef = useRef([]);

  const getAllData = async () => {
    try {
      const res = await callApi({
        endpoint: `api/Dashboard/${id.split("=")[1]}`,
      });

      setAws_Id(res?.aws);
      console.log("AWS ID:", res?.aws);

      const templateLength = Array.isArray(res?.template) ? res.template.length : 0;
      if (templateLength === 0) {
        console.warn("No templates found in response.");
        return;
      }

      console.log("Template length:", templateLength);
      console.log("🚀 Template data:", res.template);

      const current = props.instances?.[props.currentInstance];
      if (current?.data) {
        editor?.canvas?.loadFromJSON({ objects: current.data });
        editor?.canvas?.renderAll();
        editor?.canvas?.setDimensions({
          width: current.width || 1920,
          height: current.height || 1080,
        });
        setTimeout(() => {
          editor?.canvas?.renderAll();
        }, 500);
      }

      setTimeout(() => window.location.reload(), 60 * 180 * 1000); // auto-refresh in 3 hours

      // Fetch AQI data initially
      await fetchAQILog();

      // Set intervals
      awsIntervalRef.current = setInterval(fetchAQILog, 60000); // every 1 min
      updateDataIntervalRef.current = setInterval(async () => {
        try {
          await getUpdatedData();
        } catch (err) {
          console.log("Error in getUpdatedData:", err);
        }
      }, 105000);

    } catch (err) {
      console.log("Error fetching Dashboard:", err);
      updateDataIntervalRef.current = setInterval(async () => {
        try {
          await getUpdatedData();
        } catch (err) {
          console.log("Fallback getUpdatedData error:", err);
        }
      }, 105000);
    }
  };

  const fetchAQILog = async () => {
    try {
      const res = await callApi({ endpoint: `aqi-last-log` });
      console.log("AQI RES:", res);

      if (!res || !Array.isArray(res.data) || res.data.length === 0) {
        console.warn("Empty AQI data, skipping update.");
        return;
      }

      setAws_d(res.data);

      const currentCanvas = instancesRef.current?.[props.currentInstance];
      if (currentCanvas?.data) {
        editor?.canvas?.loadFromJSON({ objects: currentCanvas.data });
        editor?.canvas?.renderAll();
        editor?.canvas?.setDimensions({
          width: props.instances?.[props.currentInstance]?.width || 1920,
          height: props.instances?.[props.currentInstance]?.height || 1080,
        });
        setTimeout(() => editor?.canvas?.renderAll(), 500);
      }
    } catch (err) {
      console.log("AQI fetch error:", err);
    }
  };

  const manageInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const currentInstance = props.currentInstance;
    const instanceData = props.instances?.[currentInstance];

    if (!instanceData) {
      console.warn("Skipping manageInterval: instance data not available");
      return;
    }

    const interval = calculateDynamicInterval(currentInstance);
    console.log(`⏱️ Setting interval of ${interval}ms for instance ${currentInstance}`);

    intervalRef.current = setInterval(() => {
      console.log(`⏰ Interval tick for instance ${currentInstance}`);
      // Your instance update logic here
    }, interval);
  };

  // ✅ On mount: get initial data
  useEffect(() => {
    const init = async () => {
      props._updateCurrentInstance(0);
      await getAllData();
    };
    init();
  }, []);

  // ✅ Watch for props.instances update to trigger interval
  useEffect(() => {
    if (Array.isArray(props.instances) && props.instances.length > 0) {
      console.log("✅ Instances Loaded:", props.instances);
      instancesRef.current = props.instances;
      manageInterval();
    } else {
      console.warn("⚠️ No instances available, skipping manageInterval.");
    }
  }, [manageInterval, props.instances]);

  // ✅ Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (awsIntervalRef.current) clearInterval(awsIntervalRef.current);
      if (updateDataIntervalRef.current) clearInterval(updateDataIntervalRef.current);
    };
  }, []);
};

  const LoadDataFromJson = (index) => {
    try {
      console.log("going inside......", props.instances, index);
      if (props.instances[index]?.data) {
        editor?.canvas?.clear();
        //   editor?.canvas?.set(props.instances[index]?.data);
        let d = props?.instances?.[index].data;
        console.log(d, aws_d, "data...");
        let final_d = [];
        d.forEach((element) => {
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
            const pm25Data = aws_d[0]?.indoor_air_quality?.find(
              (item) => item.param === "pm2.5"
            );
            const pm10Data = aws_d[0]?.indoor_air_quality?.find(
              (item) => item.param === "pm10.0"
            );
            let el_ = element;
            el_.src = getAQIColor(
              parseInt(
                calculateAQIPM25PM10(
                  pm25Data?.["value"],
                  pm10Data?.["value"]
                )?.split(" ")?.[0]
              )
            )?.src;
            final_d.push(el_);
          } else if (element.type === "text") {
            if (isEmpty(element.text)) {
              return;
            }

            if (
              element?.text?.startsWith("DAY_TEXT") ||
              containsAbbreviatedGreeting(element?.text)
            ) {
              let el_ = element;

              el_.text = getGreeting();

              el_.left = (el_.text.length * el_.fontSize) / 2 + el_.fontSize;
              final_d.push(el_);
            } else if (
              element?.text?.includes("AQI") ||
              containsAbbreviatedAQI(element?.text)
            ) {
              let el_ = element;
              const pm25Data = aws_d[0]?.indoor_air_quality?.find(
                (item) => item.param === "pm2.5"
              );
              const pm10Data = aws_d[0]?.indoor_air_quality?.find(
                (item) => item.param === "pm10.0"
              );
              console.log(
                calculateAQIPM25PM10(pm25Data?.["value"], pm10Data?.["value"]),
                "CALCULATEAQIPM25"
              );
              el_.text = calculateAQIPM25PM10(
                pm25Data?.["value"],
                pm10Data?.["value"]
              )?.split(" ")?.[0];
              try {
              } catch (err) {}
              el_.fill = getAQIColor(
                parseInt(
                  calculateAQIPM25PM10(
                    pm25Data?.["value"],
                    pm10Data?.["value"]
                  )?.split(" ")[0]
                )
              ).color;
              el_.left = 350;
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
              // console.log(dateTimeString, "DATETIMEIEMIEMI");
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

              el_.left = (el_.text.length * el_.fontSize) / 2;
              final_d.push(el_);
            } else if (element?.text?.startsWith("Location")) {
              let el_ = element;
              el_.text = "Location: Delhi";
              final_d.push(el_);
            } else if (
              element?.text?.startsWith("AQI_TIMESTAMP") ||
              element?.text?.startsWith("LAST UPDATED:")
            ) {
              let el_ = element;
              const readableTimestamp = aws_d[0]?.timestamp
                ? new Date(aws_d[0]?.timestamp).toLocaleString() // Converts to local date-time format
                : "No timestamp available";
              el_.text = "LAST UPDATED: " + readableTimestamp;
              final_d.push(el_);
            }
            // console.log(element.text, "element...IS HERE", aws_d);
            if (!aws_d) {
              return;
            }
            // console.log("still going inside");
            let el_ = element;
            const regex = /< (.*?) >/;
            const match = el_?.id?.match(regex);
            const valueInsideBrackets = match ? match[1] : null;
            // console.log(valueInsideBrackets);
            let el_split = valueInsideBrackets;
            // console.log(el_split);
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
    } catch (error) {
      console.log(error, "ERRORROOOOOOOR");
    }
  };

  // Helps to load the the data on every Interval
  useEffect(() => {
    if (countRef) {
      LoadDataFromJson(countRef.current);
    }
  }, [countRef.current]);

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
      color: "#02AF52",
      label: "Good",
      src: "https://backend.iaqm.in/default/indoor_good.png",
    },
    {
      max: 100,
      color: "#91D14F",
      label: "Moderate",
      src: "https://backend.iaqm.in/default/indoor_satisfactory.png",
    },
    {
      max: 200,
      color: "#E2E219",
      label: "Unhealthy for Sensitive Groups",
      src: "https://backend.iaqm.in/default/indoor_moderate.png",
    },
    {
      max: 300,
      color: "#FF9A01",
      label: "Unhealthy",
      src: "https://backend.iaqm.in/default/indoor_poor.png",
    },
    {
      max: 400,
      color: "#FF0000",
      label: "Very Unhealthy",
      src: "https://backend.iaqm.in/default/indoor_very_poor.png",
    },
    {
      max: Infinity,
      color: "#BF0101",
      label: "Hazardous",
      src: "https://backend.iaqm.in/default/indoor_severe.png",
    },
  ];

  /////// END PREVIEW CODE

  return (
    <div
      className="h-[100vh] w-[100vw] flex bg-gray-400 items-center overflow-hidden "
      style={{
        pointerEvents: "none", // Disables interaction
        cursor: "none", // Hides the cursor
        backgroundColor: "black",
      }}
    >
      <div className="h-[100vh] w-[100vw] flex flex-col justify-between overflow-hidden ">
        {/* <CreatorHeader
          height={height}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          editor={editor}
          name={name}
          canvasLoading={canvasLoading}
          setCanvasLoading={setCanvasLoading}
        /> */}
        <div
          className={`relative h-[100%] flex items-center justify-center w-[100%] overflow-x-auto overflow-y-scroll bg-white ${
            !disablePanMode ? "cursor-none" : "cursor-none"
          }`}
          style={{
            overflow: "hidden",
            pointerEvents: "none", // Disables interaction
            cursor: "none", // Hides the cursor
            backgroundColor: "black",
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
            onInit={(ref) => {
              let canvas = document.getElementsByClassName("canvas-container");
              if (!canvas) return;
              parentRef.current?.zoomToElement(canvas[0]);
            }}
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
                <div
                  style={{ display: "none" }}
                  className="fixed bg-white flex bottom-40 right-[450px] z-[2] right-4 border border-indigo-300 shadow-lg"
                >
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
                      //   Alert("Seconds Update")
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
                    className={`px-4 py-2 hover:bg-indigo-500 flex items-center justify-center ${
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
                        {/* <div class="flex gap-2">
                          <div class="w-[4vh] h-[4vh] rounded-full animate-pulse bg-gray-600"></div>
                          <div class="w-[4vh] h-[4vh] rounded-full animate-pulse bg-gray-600"></div>
                          <div class="w-[4vh] h-[4vh] rounded-full animate-pulse bg-gray-600"></div>
                        </div> */}
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
        {/* <CreatorFooter
          handleClearCanvas={handleClearCanvas}
          height={height}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          cbToDelete={cbToDelete}
          editor={editor}
          canvasLoading={canvasLoading}
          setCanvasLoading={setCanvasLoading}
        /> */}
      </div>

      {/* <CreatorSidebar
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
      /> */}
    </div>
  );
};

export default stateConnected(PreviewV2);
