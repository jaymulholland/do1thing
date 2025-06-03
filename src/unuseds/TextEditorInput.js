import { useState } from 'react';

export default function TextEditorInput() {
  const [value, setValue] = useState('');

  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        outline: 'none',
        resize: 'none',
        fontFamily: 'monospace',
        fontSize: '16px',
        lineHeight: '1.4',
        backgroundColor: '#f9f9f9',
        caretColor: 'black',
      }}
      placeholder=""
    />
  );
}
