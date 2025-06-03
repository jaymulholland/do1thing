import './App.css';
import React, { useState } from "react";
import MultiColumnTaskEditor from './ColumnsText';
import ColumnTitles from './ColumnTitles';
import SidePanelWithToggle from './SidePanel';

function App() {
  const [editableTitles, setEditableTitles] = useState([
    "MAIN LIST",
    "CENTRAL LIST",
    "ACTIVE TASK",
  ]);
  const [isEditingTitles, setIsEditingTitles] = useState(false);

  function handleTitleChange(index, newTitle) {
    setEditableTitles((prev) => {
      const copy = [...prev];
      copy[index] = newTitle;
      return copy;
    });
  }

  function toggleEditingTitles() {
    setIsEditingTitles((prev) => !prev);
  }

  return (
    <div
      className="App"
      style={{
        position: "relative",
        height: "100vh",  // full viewport height
       
        display: "flex",
      }}
    >
      <SidePanelWithToggle />

      <main
        style={{
          flexGrow: 1,
          padding: "24px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div>
      <ColumnTitles
  editableTitles={editableTitles}
  isEditingTitles={isEditingTitles}
  onTitleChange={handleTitleChange}
  toggleEditingTitles={toggleEditingTitles}
/>
      </div>

        <MultiColumnTaskEditor />
      </main>
    </div>
  );
}

export default App;
