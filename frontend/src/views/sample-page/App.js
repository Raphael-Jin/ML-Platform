import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./utils/Sidebar";
import RenderNode from "./CustomNodes/RenderNode";
import { CopyBlock, dracula } from "react-code-blocks";
import Navbar from "./utils/Navbar";
import "./utils/index.css";

const initialNodes = [
  {
    id: "0",
    type: "input",
    data: {
      module_type: "input",
      label: "Input",
      dim: "[]",
    },
    position: { x: 0, y: 0 },
  },
];

let id = 0;
const getId = () => `${++id}`;
var NODES;
var EDGES;
var CURR_NODE_ID;
var code_snippet = "# Hit the Create Model button to generate the code";



const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChangeDefault] = useNodesState(initialNodes);
  const [edges, setEdges, onEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [code, setCode] = useState(code_snippet);

  // copied
  const [args, setArgs] = useState({ in_features: 0, out_features: 0 });
  const [kwargs, setKwargs] = useState({ bias: "True", device: "None", dtype: "None" });
  const [dimension, setDimension] = useState("[]");
  const [nodeHidden, setNodeHidden] = useState(false);
  // end of copy

  NODES = nodes;
  EDGES = edges;

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const updateCurrNode = useCallback((ns) => {
    CURR_NODE_ID = ns[ns.length - 1].id;
    // console.log(`updateCurrNode: ${CURR_NODE_ID}`);
    // console.log(ns);
  }, []);

  const onNodesChange = useCallback((ns) => {
    onNodesChangeDefault(ns);
    updateCurrNode(ns);
  }, []);

  const onNodeClick = useCallback((event, ns) => {
    setArgs(ns.data.args);
    setKwargs(ns.data.kwargs);
    setDimension(ns.data.dimension);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const Nodeargs = RenderNode(type);
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: `${type}`,
          module_type: Nodeargs.module_type,
          args: Nodeargs.args,
          kwargs: Nodeargs.kwargs,
          dimension: Nodeargs.dim,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      console.log(newNode);
    },
    [reactFlowInstance]
  );

  const argsItemsLabel =
    Object.keys(args).length === 0 ? null : (
      <div>
          Args:
        <br />
      </div>
    );
  const argsItems = Object.entries(args).map(([key, val]) => (
    <div>
      <label>
        {key}
        <input
          value={val}
          onChange={(evt) => {
            setArgs({ ...args, [key]: evt.target.value });
            console.log(args);
          }}
        />
      </label>
      <br />
    </div>
  ));
  const kwargsItemsLabel =
    Object.keys(kwargs).length === 0 ? null : (
      <div>
        Kwargs:
        <br />
      </div>
    );
  const kwargsItems = Object.entries(kwargs).map(([key, val]) => (
    <div>
      <label>
        {key}
        <input
          value={val}
          onChange={(evt) => setKwargs({ ...kwargs, [key]: evt.target.value })}
        />
      </label>
      <br />
    </div>
  ));
  const dimLabel =
    dimension === null ? null : (
      <label>
        Dimension:
        <input
          value={dimension}
          onChange={(evt) => setDimension(evt.target.value)}
        />
      </label>
    );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === CURR_NODE_ID) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            args: args,
            kwargs: kwargs,
            dimension: dimension,
          };
        }

        return node;
      })
    );
  }, [args, kwargs, setArgs, setKwargs, dimension, setDimension]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === CURR_NODE_ID) {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === "e1-2") {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges]);

  return (
    <>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onNodeClick={onNodeClick}
              onEdgesChange={onEdges}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              attributionPosition="bottom-left"
              fitView
            >
              <Controls />
              <div className="updatenode__controls">
                {argsItemsLabel}
                {argsItems}
                {kwargsItemsLabel}
                {kwargsItems}
                {dimLabel}
              </div>
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>

      
    </>
  );
};



function App() {
    const [code, setCode] = useState(code_snippet);
    const handleClick = async (e) => {
//   console.log(NODES);
//   console.log(EDGES);
  e.preventDefault();
  try {
    // jsonify nodes and edges
    let res = await fetch("/create-model", {
      method: "POST",
      body: JSON.stringify({
        nodes: NODES,
        edges: EDGES,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resJson = await res.json();
    // python code from res.json
    if (res.status === 200) {
      console.log(resJson);
      code_snippet = resJson.model_script;
      setCode(code_snippet);
    } else {
      console.error("Some error occurred");
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div >
      <Navbar />
      <div className="App" style={{ height: "100vh" }}>
        <DnDFlow />
        <div className="right-half container mx-auto p-4">
        {/* https://codesandbox.io/s/react-code-blocks-xgjrr?fontsize=14&file=/src/index.js */}
        <div className="demo">
          <CopyBlock
            language="python"
            text={code}
            codeBlock
            theme={dracula}
            showLineNumbers={false}
          />
        </div>
      </div>
      </div>
      <div
        className="Button"
        style={{
          position: "absolute",
          top: "95%",
          left: "63%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <button className="createModel" onClick={handleClick}>
          Create Model
        </button>
      </div>
    </div>
  );
}
export default App;
