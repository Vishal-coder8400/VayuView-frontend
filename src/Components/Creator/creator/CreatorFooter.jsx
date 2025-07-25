import React from "react";
import { stateConnected } from "../../../utils/redux_tools";
import AddIcon from "./icons/AddIcon";
import InstanceCard from "./InstanceCard";
import Error from "../../../utils/Error";

const CreatorFooter = (props) => {
  const {
    height,
    setHeight,
    width,
    setWidth,
    editor,
    cbToDelete,
    canvasLoading,
    setCanvasLoading,
  } = props;

  const handleInstanceClick = (id, instances) => {
    console.log(id, instances, 'ACTIONinstancesINSTANCES')
    // setCanvasLoading(true);
    props._updateCurrentInstance(id);
    setHeight(props?.instances[id]?.height);
    setWidth(props?.instances[id]?.width);
    setTimeout(() => {
      setCanvasLoading(false);
    }, 500);
  };

  const handleInstanceDelete = (id) => {
    console.log("🚀 ~ handleInstanceDelete ~ props.instances.length:", props.instances.length)
    if (props.instances.length === 1) {
      Error(`Cant delete. Minimum Page Limit is 1`);
      return;
    }
    if (id === props.currentInstance) {
      // cbToDelete();
      // isEventSuppressed.current = true;
      // editor?.canvas?.clear();
    }
    console.log("🚀 ~ handleInstanceDelete ~ id:", id, props.currentInstance)
    props._deleteInstance(id);
    // props._updateCurrentInstance(
    //   props.instances.length - 2 < 0 ? 0 : props.instances.length - 2
    // );
    // props._updateCurrentInstance(id - 1 <= 0 ? 0 : id - 1); //
    handleInstanceClick(id - 1 <= 0 ? 0 : id - 1); //
  };
  return (
    <div className="flex bg-gray-100">
      <div className="w-full p-4 h-[140px] bg-gray-100 flex gap-4 items-center border-t border-t-gray-200 overflow-x-auto overflow-y-hidden">
        {canvasLoading ? (
          <>
            <div class="border border-white-300 bg-white w-[18%] ml-4 shadow p-4 max-w-sm animate-pulse bg-gray-500 cursor-wait">
              <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-6 py-1">
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border border-white-300 bg-white w-[18%] ml-4 shadow p-4 max-w-sm animate-pulse bg-gray-500 cursor-wait">
              <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-6 py-1">
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border border-white-300 bg-white w-[18%] ml-4 shadow p-4 max-w-sm animate-pulse bg-gray-500 cursor-wait">
              <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-6 py-1">
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            className={`w-full gap-4 p-2 m-4 items-center flex`}
          >
            {props.instances?.map((element, index) => (
              <InstanceCard
                key={element.id}
                element={element}
                title={element.id}
                id={element.id}
                index={index}
                onClick={() => handleInstanceClick(index, props.instances)}
                onDelete={(e) => {
                  e.stopPropagation();
                  handleInstanceDelete(index);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <button
        className={`flex m-4 justify-center items-center self-center bg-white border border-primary min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full shadow-sm ${
          canvasLoading ? "cursor-wait" : "cursor-pointer"
        }`}
        onClick={() => {
          props._addInstance({
            id: props.instances.length,
            instance: props.instances.length,
            height: props.instances?.[0].height || 1100,
            width: props.instances?.[0].width || 1920,
            data: [],
          });
        }}
        disabled={canvasLoading}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default stateConnected(CreatorFooter);
