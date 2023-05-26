import React, { useState } from "react";
import { useContext } from "react";
import { ArgsContext } from "../../context/argsContext";

const Args = () => {
  const { args, setArgs } = useContext(ArgsContext);

  const addArgs = () => {
    args.push({ title: "My args", status: true });
    setArgs([...args]);
    console.log(args);
  };

  const handleArgs = (e, item, index) => {
    console.log(e.target.name, e.target.value);
    const temp = { ...item, [e.target.name]: e.target.value };
    console.log(temp);
    args[index] = temp;
    setArgs([...args]);
  };
  return (
    <div>
      <p>All: {args.length}</p>

      {args &&
        args.length &&
        args.map((item, index) => (
          <div key={index}>
            <input
              name="title"
              type="text"
              value={item.title}
              onChange={(e) => handleArgs(e, item, index)}
            />
            <select
              name="status"
              id=""
              value={item.status}
              onChange={(e) => handleArgs(e, item, index)}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        ))}

      <button onClick={addArgs}>
        <span>&#43;</span> Add Arg
      </button>
    </div>
  );
};

export default Args;
