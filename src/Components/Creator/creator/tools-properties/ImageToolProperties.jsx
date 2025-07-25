import React from "react";

const ImageToolProperties = (props) => {
  const updateObjectProperties = (canvas, newProperties, props) => {
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      // Update the object properties
      activeObject.set({ ...activeObject.toObject(), ...newProperties });

      activeObject.sendToBack(); // Send stroke to the back

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
    <div className="p-4">
      <div className="flex flex-col flex-wrap gap-2">
        <div className="border p-2 shadow-sm w-[100%]">
          <p>border stroke</p>
          <input
            type="range"
            className="w-full cursor-pointer"
            onChange={(e) => {
              const strokeWidth = parseInt(e.target.value, 10);
              let obj = { strokeWidth };
              updateObjectProperties(props.editor.canvas, obj, props);
            }}
          />
        </div>
        <div className="border p-2 shadow-sm w-[100%]">
          <p>border Color</p>
          <input
            type="color"
            className="w-full cursor-pointer"
            onChange={(e) => {
              let obj = { stroke: e.target.value };
              updateObjectProperties(props.editor.canvas, obj, props);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageToolProperties;
