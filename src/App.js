import './App.css';
import React, { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import DarkModeSwitch from './DarkModeSwitch';
import MultiColumnTaskEditor from './ColumnsText';
import ColumnTitles from './ColumnTitles';
import SidePanelWithToggle from './SidePanel';
import ClickSpark from './ClickSpark';
import { ThemeContext } from "./ThemeContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#90caf9' },
      secondary: { main: '#131052' },
    },
  });

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
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ position: "relative", height: "100%", display: "flex" }}>
         

          <SidePanelWithToggle />

          <main style={{ flexGrow: 1, padding: "24px", overflowY: "auto", boxSizing: "border-box" }}>
            <ColumnTitles
              editableTitles={editableTitles}
              isEditingTitles={isEditingTitles}
              onTitleChange={handleTitleChange}
              toggleEditingTitles={toggleEditingTitles}
            />
            <MultiColumnTaskEditor />
             <div
  style={{
    position: 'fixed',
    bottom: 16,
    left: 16,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000, // optional, to stay above other elements
  }}
>
  <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

</div>
          </main>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
