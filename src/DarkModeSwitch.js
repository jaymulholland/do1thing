import { FaMoon, FaLightbulb } from "react-icons/fa";

export default function DarkModeSwitch({ darkMode, toggleDarkMode }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        style={{ display: "none" }}
      />
      <div
        style={{
          width: 50,
          height: 26,
          backgroundColor: darkMode ? "#333" : "#ccc",
          borderRadius: 20,
          position: "relative",
          transition: "background-color 0.3s",
          padding: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: darkMode ? 26 : 3,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: darkMode ? "#222" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: darkMode ? "white" : "#555",
            transition: "left 0.3s",
          }}
        >
          {darkMode ? <FaLightbulb /> : <FaMoon />}
        </div>
      </div>
    </label>
  );
}