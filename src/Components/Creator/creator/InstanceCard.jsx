import React, { useEffect, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { stateConnected } from "../../../utils/redux_tools";
const InstanceCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { onDelete, onClick, title, element, index } = props;
  //
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [imge, setImge] = useState(null);
  useEffect(() => {
    editor?.canvas?.loadFromJSON({
      objects: element?.data,
    });
    let url = editor?.canvas?.toDataURL();
    setImge(url);
    editor?.canvas?.renderAll();
    editor?.canvas?.setDimensions({
      width: props?.instances?.[index].width,
      height: props?.instances?.[index].height,
    });
    editor?.canvas?.setWidth(props?.instances?.[index].width);
    editor?.canvas?.setHeight(props?.instances?.[index].height);
  }, [onReady]);
  //
  return (
    <div
      className={`relative cursor-pointer bg-black max-h-[80px] max-w-[180px] min-h-[80px] min-w-[180px] border ${
        props?.id === props.currentInstance
          ? "border-primary shadow-[5px_5px_0px_0px_#7367f0]"
          : " border-gray-400 "
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <FabricJSCanvas
        className={`h-[${props.instances[index]?.height}px] w-[${props.instances[index]?.width}px] bg-white shadow-lg border border-gray-400 hidden `}
        onReady={onReady}
      />
      <img
        src={imge}
        className="w-full h-[78px] object-contain"
        alt=""
        srcset=""
      />
      {isHovered && (
        <button
          className="absolute -top-2 -right-2 bg-white rounded-full hover:bg-red-500 hover:shadow-2xl border"
          onClick={onDelete}
        >
          <CloseIcon size={26} />
        </button>
      )}
    </div>
  );
};

export default stateConnected(InstanceCard);
