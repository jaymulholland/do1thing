import React, { useState } from 'react';
import TrashBin from './trash';

export default function TaskManager() {
  const [columns, setColumns] = useState({
    todo: ['Task 1', 'Task 2'],
    inProgress: ['Task 3'],
    done: ['Task 4'],
  });

  const deleteAllTasks = () => {
    
  };

  return (
    <div style={{ padding: 16 }}>
      <button
        onClick={deleteAllTasks}
        style={{
          backgroundColor: '#ff6666',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: 4,
          padding: '8px 12px',
          cursor: 'pointer',
          
        }}
      >
        Delete All Tasks
      </button>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {Object.entries(columns).map(([columnName, tasks]) => (
          <div
            key={columnName}
            style={{
              flex: 1,
              background: '#f0f0f0',
              padding: 8,
              borderRadius: 4,
            }}
          >
            <h3 style={{ marginTop: 0 }}>{columnName}</h3>
            {tasks.length === 0 ? (
              <div style={{ color: '#999' }}>No tasks</div>
            ) : (
              tasks.map((task, i) => (
                <div
                  key={i}
                  style={{
                    padding: '4px 8px',
                    background: '#fff',
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                >
                  {task}
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      <TrashBin />
    </div>
  );
}
