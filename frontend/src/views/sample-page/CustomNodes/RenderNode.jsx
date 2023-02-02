const RenderNode = (type) => {
  switch (type) {
    case "input":
      return {
        module_type: "input",
        dim: "[]",
        args: {},
        kwargs: {},
      };
    case "output":
      return {
        module_type: "output",
        dim: "[]",
        args: {},
        kwargs: {},
      };
    case "Linear":
      return {
        module_type: "Linear",
        dim: null,
        args: { in_features: 0, out_features: 0 },
        kwargs: { bias: "True", device: "None", dtype: "None" },
      };
    case "ReLU":
      return { 
        module_type: "ReLU",
        dim: null, 
        args: {}, 
        kwargs: {}
      };
    case "Softmax":
      return { 
        module_type: "Softmax",
        dim: null, 
        args: {}, 
        kwargs: {dim: "None"} 
      };
    case "Flatten":
    return { 
      module_type: "Flatten",
      dim: null, 
      args: {}, 
      kwargs: {start_dim: "1", end_dim: "-1"} 
    };
    case "Concat":
    return { 
      module_type: "Concat",
      dim: null, 
      args: {}, 
      kwargs: {dim: 0} 
    };
    default:
      return { dim: null, args: {}, kwargs: {} };
  }
};

export default RenderNode;
