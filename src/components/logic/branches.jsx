import React, { useState, useContext } from "react";
import { ArgsContext } from "../../context/argsContext";

const Branches = (props) => {
  const { handleBranches, logic, setLogic } = props;
  const { args, setArgs } = useContext(ArgsContext);
  const [option, setOption] = useState("");
  const [status, setStatus] = useState(undefined);

  const [tempArgs, setTempArgs] = useState(args);

  const handleOptions = (e) => {
    setOption(e.target.value);
    if (!e.target.value) {
      setStatus(undefined);
    } else if (e.target.value === "constant") {
      setStatus("false");
    } else if (e.target.value === "argument") {
      console.log(e.target.value);
      console.log(args[0]);
      if (args[0].status === "true" || args[0].status === true) {
        setStatus("true");
      } else {
        setStatus("false");
      }
    }
  };

  const handleConstants = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  return (
    <div>
      {" "}
      {!option && (
        <div>
          <select name="options" id="" onChange={handleOptions}>
            <option value="selected" selected disabled>
              ...selected
            </option>
            <option value="constant">constant</option>
            <option value="argument">argument</option>
            <option value="and">and</option>
            <option value="or">or</option>
          </select>
          <button>
            <span>&#10005;</span>
          </button>
        </div>
      )}
      {option === "constant" && (
        <div>
          {" "}
          <select name="constant" id="" onChange={handleBranches}>
            <option value="true">true</option>
            <option value="false" selected>
              false
            </option>
          </select>
          <button>
            <span>&#10005;</span>
          </button>
        </div>
      )}
      {option === "argument" && (
        <div>
          {" "}
          <select name="argument" id="" onChange={handleBranches}>
            {tempArgs &&
              tempArgs.length &&
              tempArgs.map((item, index) => (
                <option key={index} selected={index === 0} value={item.status}>
                  {item.title}
                </option>
              ))}
          </select>
          <button>
            <span>&#10005;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Branches;
