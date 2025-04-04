import React, { useState } from 'react'

function Pct() {
    const [message, setMessage] = useState('Hello World');
  return (
    <div>
    <p data-testid="message">{message}</p>
    <button onClick={() => setMessage('Button Clicked')}>Click Me</button>
  </div>
  )
}

export default Pct;