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
    width: 40,
    height: 20,
    backgroundColor: darkMode ? "#333" : "#ccc",
    borderRadius: 20,
    position: "relative",
    transition: "background-color 0.3s",
  }}
>
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: darkMode ? 22.5 : 2.5,
      transform: "translateY(-50%)",
      width: 15,
      height: 15,
      borderRadius: "50%",
      backgroundColor: darkMode ? "#222" : "#fff",
      transition: "left 0.3s",
    }}
  />
</div>


    </label>
  );
}