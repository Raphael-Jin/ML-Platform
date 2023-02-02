import React from "react";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      {/* <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input
      </div> */}
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Linear")}
        draggable
      >
        Linear
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "ReLU")}
        draggable
      >
        ReLU
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Flatten")}
        draggable
      >
        Flatten
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Softmax")}
        draggable
      >
        Softmax
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Concat")}
        draggable
      >
        Concat
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output
      </div>
    </aside>
  );
};
