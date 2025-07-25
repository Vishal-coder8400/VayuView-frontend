import React from "react";

const ReusableOptions = (props) => {
  const { defaultOptions } = props;

  //   const [currentActiveObject, setCurrentActiveObject] = useState(
  //     props?.editor?.canvas.getActiveObject()
  //   );

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
    <>
      {defaultOptions &&
        defaultOptions?.map((element, index) => {
          return (
            <div className="p-2 shadow-sm w-[100%]">
              <p className="mb-2">{element.title}</p>
              <input
                className="transition block w-full h-[40px] rounded-[4px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type={element.type}
                onChange={(event) => {
                  let eventValue =
                    element.type === "color"
                      ? event.target.value
                      : parseInt(event.target.value, 10) * 2;
                  let obj = {
                    [element.key]: eventValue,
                  };
                  updateObjectProperties(props.editor.canvas, obj, props);
                }}
              />
            </div>
          );
        })}
    </>
  );
};

export default ReusableOptions;
