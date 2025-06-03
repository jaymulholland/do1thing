export default function ClearAllTasksButton({ onConfirm, onCancel, confirm }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 20,
        userSelect: "none",
        padding: 12,
        borderRadius: 8,
        zIndex: 9999,
      }}
    >
      {!confirm ? (
        <button
          onClick={onConfirm}
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: "0px solid #000",
            backgroundColor: "white",
            color: "rgba(0, 0, 0, 0.5)",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          title="Clear all tasks in all columns"
        >
          Clear All Tasks
        </button>
      ) : (
        <>
          <span
            style={{
              color: "#000",
              marginRight: 12,
              alignSelf: "center",
            }}
          >
            Are you sure?
          </span>
          <button
            onClick={onConfirm}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "2px solid #000",
              backgroundColor: "white",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
              marginRight: 8,
            }}
            title="Confirm clear all tasks"
          >
            Clear All
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "0px solid #999",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            title="Cancel clear all"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  )
}
