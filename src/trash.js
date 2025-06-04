import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { FaTrashAlt } from "react-icons/fa";

export default function TrashBin() {
  const { isOver, setNodeRef } = useDroppable({ id: 'trash-bin' });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'fixed',
        bottom: 20, 
        width: 60, 
       
        height: 40,
       
       
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
