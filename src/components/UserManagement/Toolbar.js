import React from "react";

const Toolbar = ({ selectedUsers, onAction }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onAction("block")}>Block</button>
      <button onClick={() => onAction("unblock")}>Unblock</button>
      <button onClick={() => onAction("delete")}>Delete</button>
    </div>
  );
};

export default Toolbar;