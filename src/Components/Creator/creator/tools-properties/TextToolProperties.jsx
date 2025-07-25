import React, { useState } from "react";
import CustomSelect from "./CustomSelect";

const TextToolProperties = (props) => {
  const fontFamilyOptions = [
    { value: "arial", label: "Arial" },
    { value: "helvetica", label: "Helvetica" },
    { value: "myriad pro", label: "Myriad Pro" },
    { value: "delicious", label: "Delicious" },
    { value: "verdana", label: "Verdana" },
    { value: "georgia", label: "Georgia" },
    { value: "courier", label: "Courier" },
    { value: "comic sans ms", label: "Comic Sans MS" },
    { value: "impact", label: "Impact" },
    { value: "hoefler text", label: "Hoefler Text" },
    { value: "lato", label: "lato" },
    { value: "poppins", label: "poppins" },
    { value: "monaco", label: "Monaco" },
    { value: "optima", label: "Optima" },
    { value: "plaster", label: "Plaster" },
    { value: "engagement", label: "Engagement" },
  ];

  const currentActiveObject = props?.editor?.canvas.getActiveObject();

  const [textSettings, setTextSettings] = useState({
    fontSize: currentActiveObject?.fontSize,
    fontFamily: currentActiveObject?.fontFamily,
    isBold: currentActiveObject?.bold,
    isItalic: currentActiveObject?.fontStyle,
    isUnderline: currentActiveObject?.underline,
    textColor: currentActiveObject?.fill,
    backgroundColor: currentActiveObject?.backgroundColor,
    scrollable: false,
  });

  const updateObjectProperties = (canvas, newProperties, props) => {
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      // Update the object properties
      activeObject.set({ ...activeObject.toObject(), ...newProperties });

      // Trigger canvas render
      canvas.renderAll();

      if (props?.currentInstance >= 0) {
        const updatedData = canvas.toJSON().objects;
        props._updateInstance({
          id: props.currentInstance,
          instance: props.currentInstance,
          data: updatedData,
        });
        console.log("🚀 ~ updateObjectProperties ~ _updateInstance:", props._updateInstance)
      }
    }
  };

  return (
    <div>
      <div className="p-2 flex gap-2">
        <button
          onClick={() => {}}
          className="border w-auto p-2 rounded-lg shadow-sm"
        >
          <svg
            height={20}
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill={"black"}
              d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => {}}
          className="border w-auto p-2 rounded-lg shadow-sm"
        >
          <svg
            height={20}
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill={"black"}
              d="M3 4H21V6H3V4ZM3 19H21V21H3V19ZM3 14H21V16H3V14ZM3 9H21V11H3V9Z"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => {}}
          className="border w-auto p-2 rounded-lg shadow-sm"
        >
          <svg
            height={20}
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill={"black"}
              d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => {
            let obj = {
              fontStyle: textSettings.isBold === "bold" ? "normal" : "bold",
            };
            setTextSettings((prev) => {
              return {
                ...prev,
                fontStyle: textSettings.isBold === "bold" ? "normal" : "bold",
              };
            });
            updateObjectProperties(props.editor.canvas, obj, props);
          }}
          className={`border ${
            textSettings.isBold === "bold" ? "border-red-500 " : " "
          } w-auto p-2 rounded-lg shadow-sm`}
        >
          B
        </button>
        <button
          onClick={() => {
            let obj = {
              fontStyle:
                textSettings.isItalic === "italic" ? "normal" : "italic",
            };
            setTextSettings((prev) => {
              return {
                ...prev,
                fontStyle:
                  textSettings.isItalic === "italic" ? "normal" : "italic",
              };
            });
            updateObjectProperties(props.editor.canvas, obj, props);
          }}
          className={`border ${
            textSettings.isItalic === "italic" ? "border-red-500 " : " "
          } w-auto p-2 rounded-lg shadow-sm`}
        >
          I
        </button>
        <button
          onClick={() => {
            let obj = {
              underline: true,
            };
            updateObjectProperties(props.editor.canvas, obj, props);
          }}
          className="border w-auto p-2 rounded-lg shadow-sm"
        >
          U
        </button>
      </div>

      <div className="w-full p-2">
        <input
          type="color"
          className="w-full h-[40px]"
          placeholder="Font Color"
          onChange={(e) => {
            setTextSettings((prev) => {
              return { ...prev, fill: e.target.value };
            });
            let obj = {
              fill: e.target.value,
            };
            updateObjectProperties(props.editor.canvas, obj, props);
          }}
        />
      </div>
      <div className="flex items-center mb-2 p-2">
        <label className="mr-2">Text Color:</label>
        <input
          type="color"
          className="w-8 h-8  rounded-full cursor-pointer"
          value={textSettings.textColor}
          onChange={(e) => {
            setTextSettings((prev) => {
              return { ...prev, fill: e.target.value };
            });
            let obj = {
              fill: e.target.value,
            };
            updateObjectProperties(props.editor.canvas, obj, props);
          }}
        />
      </div>

      <div className="p-2 flex items-center gap-2" >
        <label>Font</label>
        <CustomSelect
          onChange={(val) => {
            // setFontFamily(val);
            let obj = { fontFamily: val.value };
            updateObjectProperties(props.editor.canvas, obj, props);
          }}
          options={fontFamilyOptions}
          value={textSettings.fontFamily}
        />
      </div>
      <div className="p-2">
        <input
          value={textSettings.scrollable}
          type="checkbox"
          id="text-scrollable hover:cursor-pointer"
          onChange={() => {
            setTextSettings((prev) => {
              return { ...prev, scrollable: !prev.scrollable };
            });
          }}
        />
        <label for="text-scrollable hover:cursor-pointer">Scrollable</label>
      </div>
    </div>
  );
};

export default TextToolProperties;
