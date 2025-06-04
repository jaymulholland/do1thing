import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SidePanelWithToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: 12,
          left: open ? 350 : 0,  // places button right at panel edge or left edge
          width: 40,
          height: 30,
          backgroundColor: "white",
          border: "none",
          borderRadius: "8px 8px 8px 8px",
          color: "black",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          zIndex: 1101, // higher than panel
          boxShadow:  "0 0px 0px rgba(0,0,0,0)" ,
          transition: "left 0.3s ease",
        }}
        aria-label={open ? "Collapse panel" : "Expand panel"}
      >
        {open ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          
          width: open ? 400 : 0,
          backgroundColor: "white", 
          color: "black",
          overflow: "hidden",
          transition: "width 0.3s ease",
          zIndex: 1100,
          display: "flex",
          flexDirection: "column",
          padding: open ? "20px" : "0px ",
          boxSizing: "border-box",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        {open && (
          <div
            style={{
              overflowY: "auto",
              flexGrow: 1,
              
              marginTop: 50,
            }}
          >



            <h2>do one thing</h2>
            <p>an organisation tool to handle life, based on the 135 rule & the "Do One Thing" method.</p>
            <p>Write down all your tasks in the left column. you can keep adding tasks as they come up.</p>
            <p>Drag tasks into your central task column, these are to be completed on that day.</p>
            <p>Take the task that brings you the most stress, and make it your active task. </p>
            <p>when it's done, you can mark it as complete.</p>
            
            <p>You shouldn't move tasks from the main to your central list until the active task is completed.</p>
            
            <p>the strategy is to only focus on the central task column- 
                you can keep on top of the important jobs, and you can keep being productive. </p>

                <p>the 3 task lists are customizable and can be used however you want.</p>
               
    <p>designed by eyes8atelier</p> 
    <p>contact: ateliyeux@gmail.com</p>
    <img
      src="/eyes82trans2s.png"
      
      style={{ width: "160px", height: "auto" }}
    />
          </div>
          
        )}
        
      </div>
    </>
  );
}
