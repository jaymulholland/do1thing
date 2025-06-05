import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { FaTrashAlt } from "react-icons/fa";

export default function TrashBin() {
  const { isOver, setNodeRef } = useDroppable({ id: 'trash-bin' });

  return (
    <div
      ref={setNodeRef}
      style={{
        
          padding: "6px 14px",
          borderRadius: 6,
          border: "0px solid #000",
          backgroundColor: "transparent",
        fontSize: isOver ? 15: 20,
      color: "rgba(0, 0, 0, 0.75)",
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      {isOver ? 'drop to delete' : <FaTrashAlt />}
    </div>
  );
}
