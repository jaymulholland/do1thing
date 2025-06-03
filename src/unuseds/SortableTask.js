import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaCheck, FaUndo } from "react-icons/fa";

export default function SortableTask({ id, text }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [completed, setCompleted] = useState(false);

  const containerStyle = {
    padding: "8px 12px",
    marginBottom: 8,
    backgroundColor: isDragging ? "#a0d2ff" : "#e0e0e0",
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    userSelect: "none",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const textStyle = {
    color: completed ? "#777" : "#000",
    textDecoration: completed ? "line-through" : "none",
    flex: 1,
  };

  function toggleComplete() {
    setCompleted((c) => !c);
  }

  return (
    <div ref={setNodeRef} style={containerStyle}>
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          borderRadius: "4px",
        }}
      >
        ⠿
      </div>
      <span style={textStyle}>{text}</span>
      <button
        onClick={toggleComplete}
        style={{
          backgroundColor: completed ? "#e0e0e0" : "#fff",
          border: "0px solid #999",
          borderRadius: 4,
          padding: "2px 6px",
          cursor: "pointer",
        }}
      >
        {completed ? <FaUndo /> : <FaCheck />}
      </button>
    </div>
  );
}
