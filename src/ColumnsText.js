"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  DndContext,
  useDroppable,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ClearAllTasksButton from "./ClearAllTasksButton";
import TrashBin from "./trash";
import { FaCheck, FaUndo, FaUpload, FaDownload } from "react-icons/fa";

function DroppableColumn({ id, isOver, setNodeRef, children }) {
  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: 600,
        height: "95%",
        padding: 10,
        backgroundColor: isOver ? "#d0f0ff" : "#fefefe",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        minWidth: 70,
      }}
    >
      {children}
    </div>
  );
}

function SortableTask({ id, text: initialText }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const [completed, setCompleted] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function handleTextClick() {
    setIsEditing(true);
  }

  function handleInputChange(e) {
    setText(e.target.value);
  }

  function finishEditing() {
    if (text.trim() === "") {
      setText(initialText); // revert if empty
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      finishEditing();
    } else if (e.key === "Escape") {
      setText(initialText); // revert on escape
      setIsEditing(false);
    }
  }

  const containerStyle = {
    padding: "8px 12px",
    marginBottom: 8,
    borderLeft: "4px solid #82cfff",
    backgroundColor: "#fcfcfc",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    fontSize: "0.875rem",
    textAlign: "left",
    gap: "8px",
    userSelect: "none",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const textStyle = {
    color: completed ? "#777" : "#000",
    textDecoration: completed ? "line-through" : "none",
    flex: 1,
    cursor: "text",
  };

  return (
    <div ref={setNodeRef} style={containerStyle}>
      <div {...attributes} {...listeners} style={{ cursor: "grab" }}>
        ⠿
      </div>

      {isEditing ? (
        <input
          ref={inputRef}
          value={text}
          onChange={handleInputChange}
          onBlur={finishEditing}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            fontSize: "0.875rem",
            padding: "2px 6px",
            borderRadius: 4,
            border: "0px solid #ccc",
          }}
        />
      ) : (
        <span style={textStyle} onClick={handleTextClick}>
          {text}
        </span>
      )}

      <button
        onClick={() => setCompleted((c) => !c)}
        style={{
          backgroundColor: completed ? "#e0e0e0" : "#fff",
          border: "0px solid #999",
          borderRadius: 4,
          padding: "2px 6px",
          cursor: "pointer",
        }}
        aria-label={completed ? "Undo complete" : "Mark complete"}
      >
        {completed ? <FaUndo /> : <FaCheck />}
      </button>
    </div>
  );
}

function ColumnWrapper({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <DroppableColumn id={id} isOver={isOver} setNodeRef={setNodeRef}>
      {children}
    </DroppableColumn>
  );
}

function SaveTasksButton({ columns }) {
  function handleSave() {
    const dataStr = JSON.stringify(columns, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleSave}
      style={{
        padding: "6px 14px",
        borderRadius: 6,
        border: "0px solid #000",
        backgroundColor: "white",
        color: "rgba(0, 0, 0, 0.7)",
        fontWeight: "bold",
        cursor: "pointer",
        marginRight: 8,
      }}
    >
      <FaDownload style={{ marginRight: 6 }} />
      Save Tasks
    </button>
  );
}



function LoadTasksButton({ onLoad }) {
  const fileInputRef = useRef(null);

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const loadedColumns = JSON.parse(ev.target.result);
        if (
          Array.isArray(loadedColumns) &&
          loadedColumns.every((col) => Array.isArray(col))
        ) {
          onLoad(loadedColumns);
        } else {
          alert("Invalid file format");
        }
      } catch {
        alert("Error parsing JSON");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: "6px 14px",
          borderRadius: 6,
          border: "0px solid #000",
          backgroundColor: "white",
          color: "rgba(0, 0, 0, 0.7)",
          fontWeight: "bold",
          cursor: "pointer",
          marginRight: 8,
        }}
      >
        <FaUpload style={{ marginRight: 6 }} />
        Load Tasks
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </>
  );
}

export default function MultiColumnTaskEditor() {
  const [confirmClear, setConfirmClear] = useState(false);
  const [columns, setColumns] = useState([
    ["enter all your tasks here.", "just info-dump everything, and organize later."],
    ["drag the tasks in here for today.", "drag tasks to the trash below to delete them."],
    ["add your most stressful task here."],
  ]);
  const [activeId, setActiveId] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, columns.length);
    for (let i = 0; i < columns.length; i++) {
      if (!inputRefs.current[i]) {
        inputRefs.current[i] = React.createRef();
      }
    }
  }, [columns.length]);

  const sensors = useSensors(useSensor(PointerSensor));

  function clearAllTasks() {
    setColumns([[], [], []]);
  }

  function handleAddTask(columnIndex, val) {
    if (!val.trim()) return;
    setColumns((prev) => {
      const copy = prev.map((col) => [...col]);
      copy[columnIndex].push(val.trim());
      return copy;
    });
    if (inputRefs.current[columnIndex]?.current) {
      inputRefs.current[columnIndex].current.value = "";
      inputRefs.current[columnIndex].current.focus();
    }
  }

  function handleCancel() {
    setConfirmClear(false); 
  }

function handleDragStart(event) {
  setActiveId(event.active.id);
}

function handleDragCancel() {
  setActiveId(null);
}
function handleDragEnd(event) {
  const { active, over } = event;
  if (!over) {
    setActiveId(null);
    return;
  }

  if (over.id === active.id) {
    setActiveId(null);
    return;
  }

  // Handle deleting task via trash bin drop
  if (over.id === "trash-bin") {
    setColumns((prev) =>
      prev.map((col) => col.filter((task) => task !== active.id))
    );
    setActiveId(null);
    return;
  }

  const fromColIndex = columns.findIndex((col) => col.includes(active.id));
  if (fromColIndex === -1) {
    setActiveId(null);
    return;
  }

  // Dropping into column area but not onto a specific task
  if (["0", "1", "2"].includes(over.id)) {
    const toColIndex = Number(over.id);

    if (fromColIndex !== toColIndex) {
      setColumns((prev) => {
        const copy = prev.map((col) => [...col]);
        copy[fromColIndex] = copy[fromColIndex].filter((task) => task !== active.id);
        copy[toColIndex].push(active.id);
        return copy;
      });
    }
    setActiveId(null);
    return;
  }

  // Dropping on a task (for reorder inside column or move between columns)
  const toColIndex = columns.findIndex((col) => col.includes(over.id));
  if (toColIndex === -1) {
    setActiveId(null);
    return;
  }

  setColumns((prev) => {
    const copy = prev.map((col) => [...col]);
    const fromTasks = copy[fromColIndex];
    const toTasks = copy[toColIndex];

    const activeTaskIndex = fromTasks.indexOf(active.id);
    const overTaskIndex = toTasks.indexOf(over.id);

    if (fromColIndex === toColIndex) {
      // Reorder within the same column
      copy[fromColIndex] = arrayMove(fromTasks, activeTaskIndex, overTaskIndex);
    } else {
      // Move task between columns
      fromTasks.splice(activeTaskIndex, 1);
      toTasks.splice(overTaskIndex, 0, active.id);
    }

    return copy;
  });

  setActiveId(null);
}





  function handleLoadTasks(loadedColumns) {
    if (loadedColumns.length !== 3) {
      alert("File must contain exactly 3 columns.");
      return;
    }
    setColumns(loadedColumns);
  }

  return (
    <>
      <DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  onDragCancel={handleDragCancel}
>
  <div style={{ display: "flex", gap: 12, flex: 1 }}>
    {columns.map((tasks, colIndex) => (
      <ColumnWrapper key={colIndex} id={colIndex.toString()}>
        <SortableContext
          id={colIndex.toString()}
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 6,
            }}
          >
            {tasks.map((task) => (
              <SortableTask key={task} id={task} text={task} />
            ))}
          </div>
        </SortableContext>

        <input
          type="text"
          placeholder="Add new task..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask(colIndex, e.currentTarget.value);
            }
          }}
          ref={inputRefs.current[colIndex]}
          style={{
            marginTop: "auto",
            padding: "8px 12px",
            borderRadius: 6,
            border: "0px solid #ccc",
            outline: "none",
            fontSize: 14,
            fontWeight: "bold",
          }}
        />
      </ColumnWrapper>
    ))}
  </div>
<DragOverlay>
    {activeId ? <SortableTask id={activeId} text={activeId} /> : null}
  </DragOverlay>
  <TrashBin />
</DndContext>



      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <ClearAllTasksButton
        onCancel={handleCancel}
          confirm={confirmClear}
          onConfirm={() => {
            if (confirmClear) {
              clearAllTasks();
              setConfirmClear(false);
            } else {
              setConfirmClear(true);
            }
            
          }}
        />
        <SaveTasksButton columns={columns} />
        <LoadTasksButton onLoad={handleLoadTasks} />
      </div>
    </>
  );
}
