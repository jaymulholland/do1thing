"use client";
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { FaCheck, FaPen } from "react-icons/fa";
import { useTheme } from './ThemeContext';

export default function ColumnTitles({
  editableTitles,
  isEditingTitles,
  onTitleChange,
  toggleEditingTitles
}) {
    const { darkMode } = useTheme();
  
  return (
    
    <div
      style={{
        marginTop: -6,
        marginBottom: 6,
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      {isEditingTitles
        ? editableTitles.map((title, i) => (
            <input
  type="text"
  value={title}
  onChange={(e) => onTitleChange(i, e.target.value)}
  rows={1}
  style={{
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    border: darkMode ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(0,0,0,0.2)",
    borderRadius: 0,
    padding: "6px 8px",
    fontFamily: "inherit",
    fontSize: 16,
    resize: "none",
    backgroundColor: "transparent",
    color: darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
  }}
/>

          ))
        : editableTitles.map((title, i) => (
            <h3
              key={i}
              style={{
                flex: 1,
                fontWeight: "bold",
                margin: 0,
                userSelect: "none",
                textAlign: "center",
              }}
            >
              {title}
            </h3>

            
          ))}

         <button
  onClick={toggleEditingTitles}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 6,
    color: isEditingTitles
      ? darkMode
        ? "rgba(255,255,255, 0.8)"
        : "rgba(0,0,0,0.8)"
      : darkMode
      ? "rgba(255,255,255, 0.6)"
      : "rgba(0,0,0,0.5)",
    alignSelf: "flex-start",
    marginLeft: 8,
  }}
  title={isEditingTitles ? "Save Titles" : "Edit Titles"}
  aria-label={isEditingTitles ? "Save Titles" : "Edit Titles"}
>
  {isEditingTitles ? (
    <FaCheck size={14} style={darkMode ? { color: "rgba(255,255,255, 0.8)" } : { color: "rgba(0, 0, 0, 0.6)" }} />
  ) : (
    <FaPen size={14} style={darkMode ? { color: "rgba(255,255,255, 0.6)" } : { color: "rgba(0, 0, 0, 0.6)" }} />
  )}
</button>



    </div>
  );
}
