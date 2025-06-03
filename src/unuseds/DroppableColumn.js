import React from "react";

export default function DroppableColumn({ id, isOver, setNodeRef, children }) {
  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: 300,
        height: "90%",
        padding: 10,
        backgroundColor: isOver ? "#d0f0ff" : "#fefefe",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        minWidth: 70,
      }}
    >
      {children}
    </div>
  );
}
