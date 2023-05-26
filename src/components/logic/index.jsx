import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ArgsContext } from "../../context/argsContext";
import Branches from "./branches";

const Logic = () => {
  const { args, setArgs } = useContext(ArgsContext);
  const [option, setOption] = useState("");
  const [status, setStatus] = useState(undefined);
  const [logic, setLogic] = useState([]);
  const [tempArgs, setTempArgs] = useState(args);

  // const options = [];

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

  const clearOptions = (e) => {
    setStatus(undefined);
    setOption("");
    setLogic([]);
  };

  const handleConstants = (e) => {
    console.log(e.target.value);
    if (e.target.value === "true" || e.target.value === true) {
      setStatus("true");
    } else {
      setStatus("false");
    }
  };

  const handleArguments = (e) => {
    console.log(e.target.value);
  };

  const handleBranches = (item, index) => {
    console.log(item, index);
    console.log(logic);
    const temp = [...logic];
    temp[index] = item.status;
    setLogic([...temp]);

    console.log(temp, option);

    if (option === "or") {
      const trues = temp.findIndex((item) => item === true);
      console.log(trues);
      if (trues !== -1) {
        setStatus("true");
      }
    }

    if (option === "and") {
      const falses = temp.findIndex((item) => item === false);
      console.log(falses);
      if (falses !== -1) {
        setStatus("false");
      } else {
        setStatus("true");
      }
    }
  };

  // const handleLogics = (e, index) => {
  //   console.log(index);
  //   setStatus(e.target.value);
  // };

  const addArgs = () => {
    //console.log("added");
    const temp = [...tempArgs, ...args];
    console.log("added:", temp);
    setTempArgs([...temp]);
  };
  return (
    <div>
      <div className="options">
        {(option === "" || option === "and" || option === "or") && (
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
            <button onClick={clearOptions}>
              <span>&#10005;</span>
            </button>
          </div>
        )}

        {option === "constant" && (
          <div>
            {" "}
            <select name="constant" id="" onChange={handleConstants}>
              <option value="true">true</option>
              <option value="false" selected>
                false
              </option>
            </select>
            <button onClick={clearOptions}>
              <span>&#10005;</span>
            </button>
          </div>
        )}

        {option === "argument" && (
          <div>
            {" "}
            <select name="argument" id="" onChange={handleConstants}>
              {args &&
                args.length &&
                args.map((item, index) => (
                  <option
                    key={index}
                    selected={index === 0}
                    value={item.status}
                  >
                    {item.title}
                  </option>
                ))}
            </select>
            <button onClick={clearOptions}>
              <span>&#10005;</span>
            </button>
          </div>
        )}

        {(option === "and" || option === "or") && args && args.length && (
          <div>
            {tempArgs.map((item, index) => (
              <div key={index}>
                <Branches
                  handleBranches={() => handleBranches(item, index)}
                  // handleOptions={handleOptions}
                  logic={logic}
                  setLogic={setLogic}
                />
              </div>
            ))}
            <button onClick={addArgs}>
              <span>&#43;</span> Add Arg
            </button>
          </div>
        )}
      </div>

      <h1>Result: {status === undefined ? "undefined" : status}</h1>
    </div>
  );
};

export default Logic;
