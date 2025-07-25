import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import TextIcon from "../icons/TextIcon";
import ImageIcon from "../icons/ImageIcon";
import aws from "./aws.json";
import { callApi } from "../../../../utils/api";

const AwsTools = (props) => {
  const { editor } = props;
  useEffect(() => {
    (async () => {
      await callApi({
        endpoint: "api/aws",
      })
        .then((res) => {
          // throw new Error("This is a test error.");
          res.data.forEach((el) => {
            if (el.aws_d) {
              let keys = Object.keys(el.aws_d);
              keys.forEach((e) => {
                if (e !== "null") {
                  setAwsTools((prev) => [
                    ...prev,
                    {
                      type: "text",
                      version: "5.3.0",
                      originX: "center",
                      originY: "center",
                      left: 263.27,
                      top: 47.74,
                      width: 172.5,
                      height: 31.64,
                      fill: "white",
                      stroke: null,
                      strokeWidth: 1,
                      strokeDashArray: null,
                      strokeLineCap: "butt",
                      strokeDashOffset: 0,
                      strokeLineJoin: "miter",
                      strokeUniform: false,
                      strokeMiterLimit: 4,
                      scaleX: 2.81,
                      scaleY: 2.81,
                      angle: 0,
                      flipX: false,
                      flipY: false,
                      opacity: 1,
                      shadow: null,
                      visible: true,
                      backgroundColor: "",
                      fillRule: "nonzero",
                      paintFirst: "fill",
                      globalCompositeOperation: "source-over",
                      skewX: 0,
                      skewY: 0,
                      fontFamily: "lato",
                      fontWeight: "normal",
                      fontSize: 28,
                      text: "< " + e + " >",
                      underline: false,
                      overline: false,
                      linethrough: false,
                      textAlign: "left",
                      fontStyle: "normal",
                      lineHeight: 1.16,
                      textBackgroundColor: "",
                      charSpacing: 0,
                      styles: [],
                      direction: "ltr",
                      path: null,
                      pathStartOffset: 0,
                      pathSide: "left",
                      pathAlign: "baseline",
                    },
                  ]);
                }
              });
            }
          });
        })
        .catch((err) => {
          let keys = Object.keys(aws.aws_d);
          keys.forEach((e) => {
            if (e !== "null") {
              setAwsTools((prev) => [
                ...prev,
                {
                  type: "group",
                  version: "5.3.0",
                  originX: "center",
                  originY: "center",
                  left: 263.27,
                  top: 47.74,
                  width: 172.5,
                  height: 31.64,
                  fill: "white",
                  stroke: null,
                  strokeWidth: 2,
                  strokeDashArray: null,
                  strokeLineCap: "butt",
                  strokeDashOffset: 0,
                  strokeLineJoin: "miter",
                  strokeUniform: false,
                  strokeMiterLimit: 4,
                  scaleX: 2.81,
                  scaleY: 2.81,
                  angle: 0,
                  flipX: false,
                  flipY: false,
                  opacity: 1,
                  shadow: null,
                  visible: true,
                  backgroundColor: "",
                  fillRule: "nonzero",
                  paintFirst: "fill",
                  globalCompositeOperation: "source-over",
                  skewX: 0,
                  skewY: 0,
                  fontFamily: "lato",
                  fontWeight: "normal",
                  fontSize: 28,
                  text: "< " + e + " >",
                  key: e,
                  underline: false,
                  overline: false,
                  linethrough: false,
                  textAlign: "left",
                  fontStyle: "normal",
                  lineHeight: 1.16,
                  textBackgroundColor: "",
                  charSpacing: 0,
                  styles: [],
                  direction: "ltr",
                  path: null,
                  pathStartOffset: 0,
                  pathSide: "left",
                  pathAlign: "baseline",
                },
               
              ]);
            }
          });
        });
    })();
    setTimeout(() => {
      setAwsTools((prev) => [
        ...prev,
        {
          type: "image",
          version: "5.3.0",
          originX: "center",
          originY: "center",
          left: 250,
          top: 75,
          width: 590,
          height: 659,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 0.5,
          scaleY: 0.5,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          cropX: 0,
          cropY: 0,
          src: "https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg",
          crossOrigin: null,
        },
        {
          type: "image",
          version: "5.3.0",
          originX: "left",
          originY: "top",
          left: 0,
          top: 0,
          width: 400,
          height: 400,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 2,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 0.56,
          scaleY: 0.56,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          cropX: 0,
          cropY: 0,
          src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          crossOrigin: "anonymous",
          filters: [],
        },
        {
          type: "i-text",
          version: "5.3.0",
          originX: "center",
          originY: "center",
          left: 263.27,
          top: 47.74,
          width: 172.5,
          height: 31.64,
          fill: "black",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 2.81,
          scaleY: 2.81,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          fontFamily: "lato",
          fontWeight: "normal",
          fontSize: 28,
          text: "DAY_TEXT",
          color: "black",
          underline: false,
          overline: false,
          linethrough: false,
          textAlign: "left",
          fontStyle: "normal",
          lineHeight: 1.16,
          textBackgroundColor: "",
          charSpacing: 0,
          styles: [],
          direction: "ltr",
          path: null,
          pathStartOffset: 0,
          pathSide: "left",
          pathAlign: "baseline",
        },
        {
          type: "i-text",
          version: "5.3.0",
          originX: "center",
          originY: "center",
          left: 263.27,
          top: 47.74,
          width: 172.5,
          height: 31.64,
          fill: "black",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 2.81,
          scaleY: 2.81,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          fontFamily: "lato",
          fontWeight: "normal",
          fontSize: 28,
          text: "LAST UPDATED:",
          color: "black",
          underline: false,
          overline: false,
          linethrough: false,
          textAlign: "left",
          fontStyle: "normal",
          lineHeight: 1.16,
          textBackgroundColor: "",
          charSpacing: 0,
          styles: [],
          direction: "ltr",
          path: null,
          pathStartOffset: 0,
          pathSide: "left",
          pathAlign: "baseline",
        },
        {
          type: "i-text",
          version: "5.3.0",
          originX: "center",
          originY: "center",
          left: 263.27,
          top: 47.74,
          width: 172.5,
          height: 31.64,
          fill: "black",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 2.81,
          scaleY: 2.81,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          fontFamily: "lato",
          fontWeight: "normal",
          fontSize: 28,
          text: "Time",
          color: "black",
          underline: false,
          overline: false,
          linethrough: false,
          textAlign: "left",
          fontStyle: "normal",
          lineHeight: 1.16,
          textBackgroundColor: "",
          charSpacing: 0,
          styles: [],
          direction: "ltr",
          path: null,
          pathStartOffset: 0,
          pathSide: "left",
          pathAlign: "baseline",
        },
        {
          type: "i-text",
          version: "5.3.0",
          originX: "center",
          originY: "center",
          left: 263.27,
          top: 47.74,
          width: 172.5,
          height: 31.64,
          fill: "black",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 2.81,
          scaleY: 2.81,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          fontFamily: "lato",
          fontWeight: "normal",
          fontSize: 28,
          text: "Location: ",
          color: "black",
          underline: false,
          overline: false,
          linethrough: false,
          textAlign: "left",
          fontStyle: "normal",
          lineHeight: 1.16,
          textBackgroundColor: "",
          charSpacing: 0,
          styles: [],
          direction: "ltr",
          path: null,
          pathStartOffset: 0,
          pathSide: "left",
          pathAlign: "baseline",
        },
        {
          type: "i-text",
          version: "5.3.0",
          originX: "center",
          originY: "center",
          left: 263.27,
          top: 47.74,
          width: 172.5,
          height: 31.64,
          fill: "black",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 2.81,
          scaleY: 2.81,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          fontFamily: "lato",
          fontWeight: "normal",
          fontSize: 28,
          text: "AQI",
          color: "black",
          underline: false,
          overline: false,
          linethrough: false,
          textAlign: "left",
          fontStyle: "normal",
          lineHeight: 1.16,
          textBackgroundColor: "",
          charSpacing: 0,
          styles: [],
          direction: "ltr",
          path: null,
          pathStartOffset: 0,
          pathSide: "left",
          pathAlign: "baseline",
        },
      ]);
    }, 2000);
  }, []);

  const onAddVideo = () => {
    // Create video element
    const videoEl = document.createElement("video");
    const canvasCenter = editor?.canvas?.getCenter();
    videoEl.width = 400;
    videoEl.height = 400;
    videoEl.left = canvasCenter?.left;
    videoEl.top = canvasCenter?.top;
    videoEl.originX = "center";
    videoEl.originY = "center";
    videoEl.crossOrigin = "anonymous";
    videoEl.controls = true;
    videoEl.src =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // Replace with the actual video URL

    // Create Fabric video object
    const fabricVideo = new fabric.Image(videoEl, {
      angle: 0,
      objectCaching: false,
      strokeWidth: 2,
      // stroke: "red",
    });

    // Add the Fabric video object to the canvas
    editor?.canvas?.add(fabricVideo);

    // Start playing the video
    fabricVideo.getElement().play();

    // Render the canvas
    fabric.util.requestAnimFrame(function render() {
      editor?.canvas?.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  };

  const AQI_LEVELS = [
    { max: 50, color: 'green', label: 'Good' },
    { max: 100, color: 'yellow', label: 'Moderate' },
    { max: 150, color: 'orange', label: 'Unhealthy for Sensitive Groups' },
    { max: 200, color: 'red', label: 'Unhealthy' },
    { max: 300, color: 'purple', label: 'Very Unhealthy' },
    { max: Infinity, color: 'maroon', label: 'Hazardous' }
];

function getAQIColor(aqi) {
    return AQI_LEVELS.find(level => aqi <= level.max);
}
  const onAddAQIParam = (aqi, parameterType) => {
    // Get the corresponding color and label for the AQI
    const { _color, label } = getAQIColor(aqi);
    let color = 'white'
    // Create a circle
    const circle = new fabric.Circle({
        radius: 100,
        fill: color,
        stroke: color,
        originX: 'center',
        originY: 'center',
    });

    // Create the heading (e.g., AQI value)
    const heading = new fabric.Text(`${aqi}`, {
        fontSize: 42,
        fill: 'black',
        originX: 'center',
        originY: 'center',
        top: -10,
    });

    // Create the subheading (e.g., AQI level description)
    const subheading = new fabric.Text(label, {
        fontSize: 22,
        fill: color,
        originX: 'center',
        originY: 'center',
        top: 40,
    });

    // Create the parameter type text (e.g., "PM2.5")
    const parameterText = new fabric.Text(parameterType.toUpperCase(), {
        fontSize: 20,
        fill: 'black',
        originX: 'center',
        originY: 'center',
        top: 30,  // Below the subheading
    });

    // Group the circle, heading, subheading, and parameter type
    const group = new fabric.Group([circle, heading, parameterText], {
      // const group = new fabric.Group([circle, heading, subheading, parameterText], {
        left: 100,
        top: 100,
        originX: 'center',
        originY: 'center',
    });

    // Add the group to the canvas
    editor?.canvas.add(group);
}


  const onAddText = (textValue) => {
    const canvasCenter = editor.canvas.getCenter();
    let random = Math.random().toString(36).slice(2);
    const textOptions = {
      left: canvasCenter.left,
      top: canvasCenter.top,
      fontFamily: "lato",
      id: "text-aws-" + random + ":_;" + textValue,
      fontSize: 28,
      fill: "white",
      editable: true,
      originX: "center",
      originY: "center",
    };
    const text = new fabric.Text(textValue, textOptions);
    console.log(text, "TEXT---");
    console.log(editor.canvas, "TEXT----");
    // Add the text object to the canvas
    editor?.canvas.add(text);
  };

  const onAddImage = (imgSrc) => {
    const canvasCenter = editor.canvas.getCenter();
    let random = Math.random().toString(36).slice(2);
    fabric.Image.fromURL(
      imgSrc,
      (img) => {
        // Set the position and size of the image
        img.set({
          left: canvasCenter.left,
          top: canvasCenter.top,
          originX: "center",
          originY: "center",
          id: "img-aws-" + random,
          scaleX: 0.5,
          scaleY: 0.5,
          crossOrigin: "anonymous", // Set crossOrigin here
        });

        // Add the image to the canvas
        editor.canvas.add(img);

        // Render the canvas
        editor.canvas.renderAll();
      },
      { crossOrigin: "anonymous" } // Add crossOrigin to the options object
    );
  };

  const [awsTools, setAwsTools] = useState([]);

  return (
    <>
      <div className="p-3">
        <h2 className="">AQI Tools</h2>
      </div>
      <>
        {awsTools.length === 0 ? (
          <>
            <div class="border border-white-300 bg-white w-[90%] ml-4 mr-4 shadow p-4 max-w-sm animate-pulse bg-white-500">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border border-white-300 bg-white w-[90%] ml-4 mr-4 shadow p-4 max-w-sm animate-pulse bg-white-500">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          awsTools?.map((element, index) => {
            if (element.type === "text") {
              return (
                <button
                  className="border border-primary w-[95%] flex gap-4 bg-white items-center p-4 shadow-sm h-[60px] ml-2 rounded"
                  onClick={() => onAddText(element?.text)}
                >
                  <TextIcon color={"#7367f0"} />
                  <p className="text-mono truncate text-primary">
                    {element?.text}{" "}
                  </p>
                </button>
              );
            } else if (element.type === "i-text") {
              return (
                <button
                  className="border border-primary w-[95%] flex gap-4 bg-white items-center p-4 shadow-sm h-[60px] ml-2 rounded"
                  onClick={() => onAddText(element?.text)}
                >
                  <TextIcon color={"#7367f0"} />
                  <p className="text-mono truncate text-primary">
                    {element?.text}{" "}
                  </p>
                </button>
              );
            } else if (element.type.startsWith("i-text")) {
              return (
                <button
                  className="border border-primary w-[95%] flex gap-4 bg-white items-center p-4 shadow-sm h-[60px] ml-2 rounded"
                  onClick={() => onAddText(element?.text)}
                >
                  <TextIcon color={"#7367f0"} />
                  <p className="text-mono truncate text-primary">
                    {element?.text}{" "}
                  </p>
                </button>
              );
            } else if (
              element.type === "image" &&
              element.src.endsWith(".mp4")
            ) {
              return (
                <button
                  className="border border-primary w-[95%] flex gap-4 bg-white items-center p-4 shadow-sm h-[60px] ml-2 rounded"
                  onClick={() => onAddVideo()}
                >
                  <ImageIcon color={"#7367f0"} />
                  <text className="text-primary">Video</text>
                </button>
              );
            } else if (element.type === "image") {
              return (
                <button
                  className="border border-primary w-[95%] flex gap-4 bg-white items-center p-4 shadow-sm h-[60px] ml-2 rounded"
                  onClick={() => onAddImage(element.src)}
                >
                  <ImageIcon color={"#7367f0"} />
                  <img
                    width={"16%"}
                    height={"100%"}
                    src={element?.src}
                    className="text-mono"
                  />
                </button>
              );
            }
            else if (element.type === "group") {
              return (
                <button
                  className="border border-primary w-[95%] flex gap-4 bg-white items-center p-4 shadow-sm h-[60px] ml-2 rounded"
                  onClick={() => onAddAQIParam(0, element?.key)}
                >
                  <TextIcon color={"#7367f0"} />
                  <p className="text-mono truncate text-primary">
                    {element?.text}{" "}
                  </p>
                </button>
              );
            }
          })
        )}
      </>
    </>
  );
};

export default AwsTools;
