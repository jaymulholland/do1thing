import React from "react";
import { useDroppable } from "@dnd-kit/core";
import DroppableColumn from "./DroppableColumn";

export default function ColumnWrapper({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <DroppableColumn id={id} isOver={isOver} setNodeRef={setNodeRef}>
      {children}
    </DroppableColumn>
  );
}
