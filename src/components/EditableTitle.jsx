import React, { useContext, useState } from "react";
import { LoanContext } from "../LoanContext";

export function EditableTitle(props) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(`Default Loan ${props.index}`)
  const inputRef = React.useRef(null);
  const loanContext = useContext(LoanContext);

  function handleUpdateFinished(newTitle) {
    loanContext[props.index - 1].title = newTitle;
    setEditMode(false);
  }
  if (editMode) {
    return (
      <div>
        <input 
          type="text" 
          defaultValue={title} 
          onChange={(val) => setTitle(val.target.value)} 
          onKeyDown={(e) => e.key === "Enter" || e.key === "Escape" ? handleUpdateFinished(false) : {}}
        />
      </div>
    );
  } else {
    return (
      <div ref={inputRef} onClick={() => !editMode ? setEditMode(true) : {} }>
        <p>{title}</p>
      </div>
    )
  }
}