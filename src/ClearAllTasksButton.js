import { useTheme } from './ThemeContext';

export default function ClearAllTasksButton({ onConfirm, onCancel, confirm }) {
  const { darkMode } = useTheme();

  const baseButtonStyle = {
    padding: "6px 14px",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: darkMode ? "#222" : "white",
    color: darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.5)",
    border: darkMode ? "0px solid #555" : "0px solid #000",
  };

  const confirmButtonStyle = {
    ...baseButtonStyle,
    color: darkMode ? "#fff" : "#000",
    border: darkMode ? "2px solid #aaa" : "2px solid #000",
  };

  const cancelButtonStyle = {
    ...baseButtonStyle,
    border: darkMode ? "0px solid #555" : "0px solid #999",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        userSelect: "none",
        padding: 0,
        borderRadius: 8,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        gap: 8,
      }}
    >
      {!confirm ? (
        <button onClick={onConfirm} style={baseButtonStyle} title="Clear all tasks in all columns">
          Clear All Tasks
        </button>
      ) : (
        <>
          <span
            style={{
              color: darkMode ? "#fff" : "#000",
              marginRight: 4,
              alignSelf: "center",
            }}
          >
            Are you sure?
          </span>
          <button onClick={onConfirm} style={confirmButtonStyle} title="Confirm clear all tasks">
            Clear All
          </button>
          <button onClick={onCancel} style={cancelButtonStyle} title="Cancel clear all">
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
