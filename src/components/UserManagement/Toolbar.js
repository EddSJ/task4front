import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faTrash } from '@fortawesome/free-solid-svg-icons';

const Toolbar = ({ selectedUsers, onAction }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onAction("block")}>
        <FontAwesomeIcon icon={faLock} /> Block
      </button>
      <button onClick={() => onAction("unblock")}>
        <FontAwesomeIcon icon={faUnlock} />
      </button>
      <button className="delete" onClick={() => onAction("delete")}>
        <FontAwesomeIcon icon={faTrash} /> 
      </button>
    </div>
  );
};
export default Toolbar;
