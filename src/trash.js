import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { FaTrashAlt } from "react-icons/fa";
import { useTheme } from './ThemeContext';


export default function TrashBin() {
  const { isOver, setNodeRef } = useDroppable({ id: 'trash-bin' });
 const { darkMode } = useTheme();
  return (
    <div
      ref={setNodeRef}
      style={{
        
          padding: "6px 14px",
          borderRadius: 6,
          border: "0px solid #000",
          backgroundColor: "transparent",
        fontSize: isOver ? 15: 20,
      color: darkMode ? "rgba(255,255,255, 0.8)" : "rgba(0, 0, 0, 0.6)",
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
