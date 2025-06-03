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
        bottom: 20, // distance from bottom
        width: 60, // width of the trash bin
       // left: '50%', // center horizontally
       // transform: 'translateX(-50%)', // offset by half its width
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
